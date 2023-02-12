const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../db/connect")

const handleRefreshToken = async (req, res) => {

    // validate user
// console.log(req.headers.cookie,"this")
    const cookie = req.headers.cookie
        if (!cookie) {
        return res.sendStatus(401)
    }

    const refreshToken = cookie.split("=")[1]


    const [row, feilds] = await db.execute(`SELECT * FROM refreshTokens WHERE token='${refreshToken}'`)
    // console.log(row)
    if (row.length === 0) return res.sendStatus(403)
    const foundUser = row[0].username


    try {

        const {username} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
        // console.log( "payload")
        if (username !== foundUser) return res.sendStatus(403);
        const accessToken = jwt.sign({ username: username }, process.env.TOKEN_SECRET_KEY, { expiresIn: '3600s' })
        res.json({ accessToken })
    }
    catch (error) {
        return res.sendStatus(403);
    }

}

module.exports = { handleRefreshToken };
