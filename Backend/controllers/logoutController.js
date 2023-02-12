const connectDB = require("../db/connect")
const db = require("../db/connect")

const handleLogoutOut = async (req, res) => {
    console.log(req.cookies)
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204)  // no content
    }

    const refreshToken = cookies.jwt

    const [row, feilds] = await db.execute(`SELECT * FROM refreshTokens WHERE token ="${refreshToken}"`)
    if (row.length === 0) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204);
    }


    await db.execute(`DELETE FROM  refreshTokens WHERE token ="${refreshToken}"`)


    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })  // add secure:true for - only serves on https
    return res.sendStatus(204);
}


module.exports={handleLogoutOut}