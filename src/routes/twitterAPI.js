const axios = require('axios')

async function twitterAPI(twitter_username, twitter_user_id) {
    // This function must be run daily as a cron job
    const user_id = twitter_user_id;
    const username = twitter_username;

    if(user_id === undefined || user_id === null) {
        console.log("User id not set");
        return {};
    }

    if(username === undefined || username === null) {
        console.log("User name not set");
        return {};
    }

    console.log(`Twitter user_id: ${twitter_user_id}. Twitter username: ${twitter_username}`)
    console.log(`User id: ${user_id}. Username: ${username}`)

    const getUserLikedTweets = async () => {
        const options = {
            method: 'GET',
            url: 'https://twitter135.p.rapidapi.com/v2/Likes/',
            params: {
              id: user_id,
              count: '10'
            },
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_TWITTER_LIKES_KEY,
              'X-RapidAPI-Host': process.env.RAPIDAPI_TWITTER_LIKES_HOST
            }
        };
    
        try {
            const response = await axios.request(options);
            const tweets_resp = response.data.data.user.result.timeline_v2.timeline.instructions[0].entries;
            const tweets = [];
            tweets_resp.forEach(tweet_item => {
                if(tweet_item.content.entryType === 'TimelineTimelineItem') {
                    const tweet_item_result = tweet_item.content.itemContent.tweet_results.result;
                    const date = new Date(tweet_item_result.legacy.created_at);
                    tweets.push({
                        id: tweet_item_result.rest_id,
                        date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                        tweet: tweet_item_result.legacy.full_text,
                    })
                    // tweets.push(tweet_item.content.itemContent.tweet_results.result.legacy.full_text)
                } 
            });
            return tweets;
        } 
        catch (error) {
            console.error(error);
            return []
        }
    }
    
    const getUserPostedTweets = async () => {
        const options = {
            method: 'GET',
            url: 'https://twttrapi.p.rapidapi.com/user-tweets',
            params: {
              username: username,
            },
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_TWITTER_TWEET_KEY,
              'X-RapidAPI-Host': process.env.RAPIDAPI_TWITTER_TWEET_HOST,
            }
        };
          
        try {
              const response = (await axios.request(options)).data;
              const tweet_results = response.data.user_result.result.timeline_response.timeline.instructions[response.data.user_result.result.timeline_response.timeline.instructions.length - 1].entries
              const tweets = []
              tweet_results.forEach(tweet_item => {
                if (tweet_item.content.__typename === 'TimelineTimelineItem') {
                    const tweet_item_result = tweet_item.content.content.tweetResult.result;
                    const date = new Date(tweet_item_result.legacy.created_at);
                    tweets.push({
                        id: tweet_item_result.rest_id,
                        date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                        tweet: tweet_item_result.legacy.full_text,
                    })
                }
              })
              return tweets;

        } 
        catch (error) {
              console.error(error);
              return [];
        }
    }

    const user_posted_tweets = await getUserPostedTweets()
    const user_liked_tweets = await getUserLikedTweets()

    const ret_tweets = {
        user_posted_tweets: user_posted_tweets,
        user_liked_tweets: user_liked_tweets,
    }
    console.log(`TwitterAPI finished running for twitter_username: ${twitter_username}`)
    return ret_tweets
}

module.exports = twitterAPI;