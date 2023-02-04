const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../db/connect")

const handleRefreshToken = async (req, res) => {

    // validate user

    const cookies = req.cookies
    i
    if (!cookies?.jwt) {
        return res.sendStatus(401)
    }

    const refreshToken = cookies.jwt


    const [row, feilds] = await db.execute(`SELECT * FROM refreshTokens WHERE token='${refreshToken}'`)
    if (row.length === 0) return res.sendStatus(403)
    const foundUser = row[0].username


    try {

        const { payload } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
        if (payload.username !== foundUser) return res.sendStatus(403);
        const accessToken = jwt.sign({ username: payload.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
        res.json({ accessToken })
    }
    catch (error) {
        return res.sendStatus(403);
    }

}

module.exports = { handleRefreshToken };
