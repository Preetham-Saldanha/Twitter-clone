const db = require("../db/connect")

class Tweet {

    constructor(tweet_id,username, tweet_text, created_at, retweet_count, favorite_count, tweet_image_path) {
        this.tweet_id = tweet_id;
        this.username = username;
        this.tweet_text = tweet_text;
        this.created_at = created_at;
        this.retweet_count = retweet_count;
        this.favorite_count=favorite_count;
        this.tweet_image_path = tweet_image_path

    }

  

  async  Post() {
        const query = `INSERT INTO tweets (username, tweet_text, created_at, retweet_count, favorite_count,tweet_image_path) VALUES ("${this.username}", "${this.tweet_text}", "${this.created_at}","${this.retweet_count}", "${this.favorite_count}", "${this.tweet_image_path}")`;
        // const values = [[this.tweet_id, this.username, this.tweet_text, this.created_at, this.retweet_count, this.tweet_image_path]]
        const result = await db.execute(query);
        console.log(result)
        return result;
       
    }

}

module.exports =Tweet