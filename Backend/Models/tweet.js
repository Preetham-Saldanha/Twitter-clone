const db = require("../db/connect")

class Tweet {

    constructor(tweet_id, username, tweet_text, created_at, retweet_count, favorite_count, tweet_image_path, firstname, lastname, profile_image_path, reply_to) {
        this.tweet_id = tweet_id;
        this.username = username;
        this.tweet_text = tweet_text;
        this.created_at = created_at;
        this.retweet_count = retweet_count;
        this.favorite_count = favorite_count;
        this.tweet_image_path = tweet_image_path
        this.firstname = firstname;
        this.lastname = lastname;
        this.profile_image_path = profile_image_path;
        this.reply_to = reply_to
    }



    async Post() {
        try{
        const query = `INSERT INTO tweets (username, tweet_text, created_at, retweet_count, favorite_count,tweet_image_path, firstname, lastname, profile_image_path, reply_to) VALUES ("${this.username}", "${this.tweet_text}", "${this.created_at}","${this.retweet_count}", "${this.favorite_count}", "${this.tweet_image_path}", "${this.firstname}", "${this.lastname}", "${this.profile_image_path}","${this.reply_to}")`;
        // const values = [[this.tweet_id, this.username, this.tweet_text, this.created_at, this.retweet_count, this.tweet_image_path]]
        const result = await db.execute(query);
        console.log(result)
        return result;
        }
        catch(error){
            console.log(error)
        }

    }

}

module.exports = Tweet