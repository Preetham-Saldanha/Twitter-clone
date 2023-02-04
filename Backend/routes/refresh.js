const { handleRefreshToken} = require ("../controllers/refreshTokenController")
const express = require("express")
const router = express.Router()

router.route("/").get(handleRefreshToken)

module.exports= router