const { StatusCodes } = require("http-status-codes")
const asyncWrapper = require("../middleware/asyncWrapper")
const db = require("../db/connect")

// replied(mention) ,retweeted , liked, followed

const notifyReply =async (type,celebrity,fan,tweet_id)=>{

}

class Notification{
constructor(){

}

async notifyOnTweet(celebrity,fan,profile_image_path,tweet_id,notify_type){
try {
   const [result] = await db.execute(`INSERT INTO notifications (celebrity,fan, profile_image_path, tweet_id,notify_type) VALUES ('${celebrity}','${fan}','${profile_image_path}','${tweet_id}','${notify_type}') `)
   console.log("this is ", result)
} catch (error) {
    console.log(error)
}
}

async notifyOnFollow(celebrity, fan, profile_image_path){
try {
    await db.execute(`INSERT INTO notifications (celebrity,fan, profile_image_path, notify_type) VALUES ('${celebrity}','${fan}','${profile_image_path}','followed') `)

} catch (error) {
    console.log(error)
}
}


}

module.exports=Notification