const fs = require("fs");
const path = require('path')
const { StatusCodes } = require("http-status-codes")
const db = require("../db/connect")

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
        id,
        firstname,
        lastname,
        location, bio } = req.body
    const profile_image_path = req.file?.filename;
console.log(id,firstname)

    const [oldRow, oldFeilds] = await db.execute(`SELECT profile_image_path FROM users WHERE id="${id}"`)
    console.log(oldRow)
    if (oldRow && oldRow[0]?.profile_image_path!=='undefined' && oldRow[0].profile_image_path !== profile_image_path) {
        // delete the old image in file system
        // const directoryPath = __dirname +"../"+ "public/profileImages/";
        const reqPath = path.join(__dirname, "../");
        fs.unlink(reqPath + "/public/profileImages/" + profile_image_path, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        })
    }
    const [row, feilds] = await db.execute(`UPDATE users SET firstname="${firstname}", lastname="${lastname}" , location="${location}",profile_image_path="${profile_image_path}" , bio ="${bio}" WHERE id="${id}"`)
    res.status(StatusCodes.OK).json({ message: "succesfully updated" })
}

const getUserProfile = async (req, res) => {
    const username = req.params.id
    console.log(username, "username")
  
    try {
        const [row] = await db.execute(`SELECT username,email,profile_image_path,followers,followers, following,id,firstname, lastname,bio,location, created_at FROM users WHERE username="${username}"`)
        // console.log("user", row)
        res.status(StatusCodes.OK).json({ "user": row })

    }
    catch (error) {
        console.log(error)
        res.status(StatusCodes.EXPECTATION_FAILED).json({ "message": "something went wrong" })
    }
}


module.exports = { removeProfileImage, updateUser, getUserProfile }