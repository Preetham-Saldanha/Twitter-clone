const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")


const auth = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    // console.log(req.headers)
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(403).send("no token found");
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = payload;
        console.log(payload)
        next()
    }
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send("log in again!")
    }
}

module.exports=auth