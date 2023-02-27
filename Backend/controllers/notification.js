const { StatusCodes } = require("http-status-codes")
const asyncWrapper = require("../middleware/asyncWrapper")
const db = require("../db/connect")


// reply(mention) ,retweet , liked, follow

const getNotifications = asyncWrapper(async (req, res, next) => {
    const { username } = req.body;
    const [result] = await db.execute(`SELECT * FROM notifications WHERE celebrity='${username}'`)
    // console.log("noties", result)
    res.status(StatusCodes.OK).json({result:result})

})


const deleteNotification = asyncWrapper(async (req, res, next) => {
    const _id = req.params.id;
    await db.execute(`DELETE FROM notifications WHERE id ="${_id}"`)
})

module.exports=  {getNotifications,deleteNotification}