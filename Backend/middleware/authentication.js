const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")


const auth = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new Error("no token found",);
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = payload;
        next()
    }
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send("log in again!")
    }
}

module.exports=auth