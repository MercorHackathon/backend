const axios = require('axios')

async function twitterAPI(req, res) {
    // This function must be run daily as a cron job
    const user_id = '44196397'
    const options = {
        method: 'GET',
        url: 'https://twitter135.p.rapidapi.com/v2/Likes/',
        params: {
          id: user_id,
          count: '4'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_TWITTER_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_TWITTER_HOST
        }
    };

    try {
        const response = await axios.request(options);
        const tweets_resp = response.data.data.user.result.timeline_v2.timeline.instructions[0].entries;
        const tweets = [];
        tweets_resp.forEach(tweet_item => {
            if(tweet_item.content.entryType === 'TimelineTimelineItem') 
                tweets.push(tweet_item.content.itemContent.tweet_results.result.legacy.full_text)
        });
        res.send(tweets)
    } 
    catch (error) {
        console.error(error);
        res.status(500)
    }

}

module.exports = twitterAPI;