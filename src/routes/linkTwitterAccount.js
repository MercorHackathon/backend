const User = require("../models/User");
const axios = require('axios');

async function linkTwitterAccount(req, res) {
    const getTwitterIdByUsername = async (username) => {
        const options = {
            method: 'GET',
            url: 'https://twttrapi.p.rapidapi.com/get-user',
            params: {
              username: username
            },
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_TWITTER_TWEET_KEY,
              'X-RapidAPI-Host': process.env.RAPIDAPI_TWITTER_TWEET_HOST,
            }
        };
          
        try {
            const response = (await axios.request(options)).data;
            return response.id_str;
        } 
        catch (error) {
            console.error(error);
            return null;
        }
    }

    try {
        const { username, twitter_username } = req.body;
        const twitter_user_id = await getTwitterIdByUsername(twitter_username);
        
        const updated_data = await User.findOneAndUpdate({username: username}, {twitter_account: {twitter_username: twitter_username, twitter_user_id}}, {new: true}).lean().exec();
        res.send(updated_data)
    }
    catch(err) {
        console.error(err);
        res.send(500)
    }
}

module.exports = linkTwitterAccount;