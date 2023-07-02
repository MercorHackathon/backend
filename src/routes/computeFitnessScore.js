const User = require("../models/User");
const huggingFaceAPI = require("./huggingfaceAPI");
const twitterAPI = require("./twitterAPI");

async function computeFitnessScore(username) {
    const user_details = await User.findOne({ username: username}).lean().exec();
    // console.log(user_details)
    if(user_details.twitter_account.twitter_username === undefined || user_details.twitter_account.twitter_username === undefined) {
        console.error(`User ${username} hasnt linked twitter account`);
        return "Failed. User hasnt linked twitter account";
    }
    
    const twitter_data = await twitterAPI( user_details.twitter_account.twitter_username, user_details.twitter_account.twitter_user_id);
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

    console.log("Received twitter data");
    // console.log(twitter_data);

    // Check if tweets are posted on the same day and filter
    const tweets1 = twitter_data.user_posted_tweets.filter(tweet => dateString === tweet.date)
    const tweets2 = twitter_data.user_liked_tweets.filter(tweet => dateString === tweet.date)

    const tweet_list = []
    let tweet1_score = 0;
    let tweet1_len = 0;
    for (let tweet_item of tweets1) {
        const emotion_obj = await huggingFaceAPI(tweet_item.tweet);
        if (emotion_obj.yValue && emotion_obj.yValue != NaN) {
            tweet1_score += emotion_obj.yValue;
            tweet1_len += 1;
            tweet_list.push({
                tweet: tweet_item.tweet,
                id: tweet_item.id,
                m_health_score: emotion_obj.yValue,
                emotion: emotion_obj.emotion
            })
        }
    }
    
    let tweet2_score = 0;
    let tweet2_len = 0;
    for(let tweet_item of tweets2) {
        const emotion_obj = await huggingFaceAPI(tweet_item.tweet);
        if (emotion_obj.yValue && emotion_obj.yValue != NaN) {
            tweet2_score += emotion_obj.yValue;
            tweet2_len += 1;
            tweet_list.push({
                tweet: tweet_item.tweet,
                id: tweet_item.id,
                m_health_score: emotion_obj.yValue,
                emotion: emotion_obj.emotion
            })
        }
    }

    console.log("Tweet dump (after emotion detection):")
    console.log(tweet_list);

    const m_health_score = (tweet1_len > 0 ? (tweet1_score/tweet1_len) : 0) + (tweet2_len > 0 ? (tweet2_score/tweet2_len) : 0);

    const user_datapoint = {
        date: dateString,
        m_health_score: Math.round(m_health_score)
    }

    const tweet_dump = {
        date: dateString,
        tweet_list: tweet_list,
    }

    console.log(`Found user datapoint for username:${username}:`)
    console.log(user_datapoint)

    // await User.findOneAndUpdate({ username: username }, { 
    //     "$push": {
    //         "mental_health_data.$.user_data": user_datapoint
    //     },
    //     "tweet_dump.last_updated": dateString,
    //     "$push": {
    //         "tweet_dump.$.tweets": tweet_dump
    //     }
    // }).exec()

    const user_document = await User.findOne({username: username}).exec();
    user_document.mental_health_data.user_data.push(user_datapoint);
    user_document.tweet_dump.last_updated = dateString;
    user_document.tweet_dump.tweets.push(tweet_dump);
    await user_document.save()
    console.log("Updated the values in the document successfully");

    return "Successfully updated!";
}

module.exports = computeFitnessScore;