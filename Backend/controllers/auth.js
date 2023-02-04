const jwt = require("jsonwebtoken")
require('dotenv').config();
const { StatusCodes } = require("http-status-codes")
const db = require("../db/connect")
const bcrypt = require("bcrypt")
const saltRounds = 10

const register = async (req, res) => {
    //add user to datbase

    const { username, password, email } = req.body

    console.log(username, password)
    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).send("Provide all email and password")
        return
    }
    const [row1, feilds1] = await db.execute(`SELECT id FROM users  WHERE username='${username}'`)
    if (row1.length !== 0) {
        res.status(StatusCodes.FORBIDDEN).send("Username is already taken")
        return
    }
    console.log("this prints")

    const hash = await bcrypt.hash(password, saltRounds)
    await db.execute(`INSERT INTO users (username,password, email) VALUES("${username}","${hash}","${email}")`)
    const [row, feilds] = await db.execute(`SELECT * FROM users WHERE username='${username}'`)

    const userData = row[0]
    const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: '15s' })
    const refreshToken = jwt.sign({ username: req.body.username }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '30s' })

    // saving token in db
    const deleteLegacyToken = await db.execute(`DELETE FROM  refreshTokens WHERE username ="${username}"`)
    if (deleteLegacyToken) await db.execute(`INSERT INTO refreshTokens (username, token) VALUES("${username}","${refreshToken}")`)
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(StatusCodes.CREATED).json({
        username: userData.username,
        email: userData.email,
        profile_image_path: userData.profile_image_path,
        followers: userData.followers,
        following: userData.following,
        id: userData.id,
        accessToken: token
    })
}


const login = async (req, res) => {

    // validate user

    const { username, password } = req.body
    console.log(username, password)
    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).send("Provide all username and password")
        return
    }
    const [row, feilds] = await db.execute(`SELECT * FROM users WHERE username='${username}'`)
    if (row.length === 0 || row[0].username!==username) {
        // throw new Error("invalid credentials")
        res.status(StatusCodes.NOT_FOUND).send("invalid credentials")
        return
    }
    const userData = row[0]
    const match = await bcrypt.compare(password, userData.password)
    if (match) {
        const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
        const refreshToken = jwt.sign({ username: req.body.username }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' })

        // saving token in db

        await db.execute(`INSERT INTO refreshTokens (username, token) VALUES("${username}","${refreshToken}")`)

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(StatusCodes.OK).json({
            username: userData.username,
            email: userData.email,
            profile_image_path: userData.profile_image_path,
            followers: userData.followers,
            following: userData.following,
            id: userData.id,
            accessToken: token
        })
    }
    else {
        // throw new Error("incorrect password")
        res.status(StatusCodes.NOT_ACCEPTABLE).send("incorrect password")
    }
}

const updateUser = async (req, res) => {
    //update user details in db
    const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 })
    res.status(StatusCodes.OK).json({
        username: req.body.username,
        accessToken: token
    })
}

module.exports = {
    register,
    login,
    updateUser,
};