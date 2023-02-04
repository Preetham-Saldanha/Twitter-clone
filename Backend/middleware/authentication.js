const jwt = require("jsonwebtoken")


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
        throw new Error("Authentication failed!")
    }
}

module.exports=auth