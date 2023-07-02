const User = require("../models/User");

async function getMentalHealthData(req, res) {
    try {
        const username = req.query.username;
        
        const data = await User.findOne({username: username}).select({mental_health_data: 1}).lean().exec()
        const ret_data = {
            user_data: data.mental_health_data.user_data,
            global_data: data.mental_health_data.global_data,
        }
        res.send(ret_data)
    }
    catch(err) {
        console.error(err);
        res.send(500);
    }
}

module.exports = getMentalHealthData