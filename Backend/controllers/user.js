const fs = require("fs");
const path = require('path')
const { StatusCodes } = require("http-status-codes")
const db = require("../db/connect");
const asyncWrapper = require("../middleware/asyncWrapper");
const Notification = require("../Models/notification");



const removeProfileImage = () => {

    const { profile_image_path } = req.body
    // const directoryPath = (__dirname ,"../")
    const reqPath = path.join(__dirname, "../");

    fs.unlink(reqPath + "/public/profileImages/" + profile_image_path, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the file. " + err,
            });
        }
    })
}


const updateUser = async (req, res) => {
    //update user details in db
    // const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 })
    // res.status(StatusCodes.OK).json({
    //     username: req.body.username,
    //     accessToken: token
    // })


    const {
        username,
        id,
        firstname,
        lastname,
        location, bio } = req.body
    const profile_image_path = req.file?.filename;

    if (profile_image_path) {  // check if there is new image being sent



        const [oldRow, oldFeilds] = await db.execute(`SELECT profile_image_path FROM users WHERE id="${id}"`)
        console.log("this works", oldRow)
        if (profile_image_path !== 'undefined' && oldRow && oldRow[0]?.profile_image_path !== 'undefined' && oldRow[0]?.profile_image_path !== profile_image_path) {
            // delete the old image in file system

            const reqPath = path.join(__dirname, "../");

            fs.unlink(reqPath + "/public/profileImages/" + oldRow[0].profile_image_path, (err) => {
                if (err) {
                    console.log("this is error", err)

                    return
                }
            })

        }
    }

    if (profile_image_path) {
        const [row] = await db.execute(`UPDATE users SET firstname="${firstname}", lastname="${lastname}" , location="${location}",profile_image_path="${profile_image_path}" , bio ="${bio}" WHERE id="${id}"`)
        await db.execute(`UPDATE tweets SET profile_image_path="${profile_image_path}",firstname="${firstname}", lastname="${lastname}" WHERE username="${username}"`)
        if (row) res.status(StatusCodes.OK).json({ message: "succesfully updated" })

    }
    else {
        const [row] = await db.execute(`UPDATE users SET firstname="${firstname}", lastname="${lastname}" , location="${location}" , bio ="${bio}" WHERE id="${id}"`)
        await db.execute(`UPDATE tweets SET firstname="${firstname}", lastname="${lastname}" WHERE username="${username}"`)

        if (row) res.status(StatusCodes.OK).json({ message: "succesfully updated" })

    }


}

const getUserProfile = async (req, res) => {
    const username = req.params.id
    console.log(username, req.user.username)
const follower= req.user.username
    try {
        const [row] = await db.execute(`SELECT username,email,profile_image_path,followers,followers, following,id,firstname, lastname,bio,location, created_at FROM users WHERE username="${username}" `)
        // console.log("user", row)
        const [followResult]= await db.execute(`SELECT * FROM followers WHERE follower="${follower}" AND following="${username}"`)
        row[0].isFollowing= (followResult[0]?.following===username)
        console.log("profile data", row[0], followResult)
        res.status(StatusCodes.OK).json({ "user": row })

    }
    catch (error) {
        console.log(error)
        res.status(StatusCodes.EXPECTATION_FAILED).json({ "message": "something went wrong" })
    }
}

const addFollower = asyncWrapper(async (req, res, next) => {
    const { follower, following } = req.body;

    const [row] = await db.execute(`INSERT INTO followers (follower, following) VALUES ("${follower}","${following}")`)
    if (row) {
        await db.execute(`UPDATE users SET following=following + 1  WHERE username="${follower}"`)
        await db.execute(`UPDATE users SET followers=followers + 1 WHERE username="${following}"`)
        await db.execute(`UPDATE tweetotherinfo SET following='${following}' WHERE follower='${follower}' AND tweet_id IN (SELECT tweet_id FROM tweets WHERE username='${following}')`)
    }
    res.status(StatusCodes.OK).json({ "message": 'success' })


    // notification for following
    if (row) {
        const notification = new Notification();
        notification.notifyOnFollow(following, follower, "-1")
    }
}
)

const unFollow = asyncWrapper(async (req, res, next) => {
    const { follower, following } = req.body;
    const [row] = await db.execute(`DELETE FROM followers WHERE follower="${follower}" AND following="${following}" `)
    if (row) {
        await db.execute(`UPDATE users SET  following=following - 1  WHERE username="${follower}"`)
        await db.execute(`UPDATE users SET followers=followers - 1 WHERE username="${following}"`)
        await db.execute(`UPDATE tweetotherinfo SET following="-1" WHERE follower="${follower}" AND following ="${following}"`)

    }
    res.status(StatusCodes.OK).json({ "message": 'success' })
})

// const getFollowersForUser= asyncWrapper(async(req, res, next)=>{
//     const {username} = req.body;
//     const [row] = await db.execute(`SELECT `)
// })

module.exports = { removeProfileImage, updateUser, getUserProfile, addFollower, unFollow }