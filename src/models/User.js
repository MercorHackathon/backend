const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    twitter_account: {
        twitter_username: {
            type: String,
            default: null
        },
        twitter_user_id: {
            type: String,
            default: null
        }
    },
    mental_health_data: {
        user_data: {
            type: Array,
            default: [],
        },
        global_data: {
            type: Array,
            default: [],
        }
    },
    tweet_dump: {
        last_updated: {
            type: String,
            default: null
        },
        tweets: {
            type: Array,
            default: [],
        }
    }
})



const User = mongoose.model("User", userSchema);

module.exports = User;