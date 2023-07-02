const User = require("../models/User");
const computeFitnessScore = require("./computeFitnessScore");

async function updateMentalHealthData(req, res) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    try {
        let global_score = 0;
        let global_count = 0;

        // Find all users -> only username
        const user_list = await User.find({}).lean().exec()
        const ignore_update_user_list = []

        // Individually update user's mental health score
        for (let obj of user_list) {
            if(obj.tweet_dump.last_updated !== dateString) {
                let result = await computeFitnessScore(obj.username);
                console.log(`Username: ${obj.username}. Mental health status: ${result}`);
            }
            else {
                ignore_update_user_list.push(obj.username)
                console.log(`User data already exists for user: ${obj.username}`)
            }
        }

        // Find all users again
        const new_user_list = await User.find({}).lean().exec()
        for(let user of new_user_list) {
            let user_data = user.mental_health_data.user_data
            if(user_data.length > 0) {
                let final_datapoint = user_data[user_data.length - 1];
                global_score += final_datapoint.m_health_score;
                global_count += 1;
            }
        }
        // Compute global mental health score
        const global_health_score = (global_count > 0) ? Math.round(global_score/global_count) : 0
        const global_datapoint = {
            date: dateString,
            m_health_score: global_health_score,
        }

        console.log("Global datapoint");
        console.log(global_datapoint)

        // Individually update global mental health score
        for(let user of new_user_list) {
            if(ignore_update_user_list.includes(user.username)) {
                console.log(`Global data already exists for user: ${user.username}`)
            }
            else {
                let user_doc = await User.findOne({ username: user.username}).exec();
                user_doc.mental_health_data.global_data.push(global_datapoint);
                await user_doc.save()  
            }
        }
        console.log("Successfully completed update");
        console.log()
        res.send({status: 'successful'})
    }
    catch(err) {
        console.error(err);
        res.send(500);
    }
}

module.exports = updateMentalHealthData;