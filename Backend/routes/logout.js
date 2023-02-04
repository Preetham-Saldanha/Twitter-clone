const { handleLogoutOut} = require ("../controllers/logoutController")
const express = require("express")
const router = express.Router()

router.route("/").get(handleLogoutOut)

module.exports= router