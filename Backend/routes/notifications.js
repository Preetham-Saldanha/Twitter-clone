const express = require("express")
const router = express.Router()
const {getNotifications,deleteNotification} = require("../controllers/notification")

router.route("/").post(getNotifications)

router.route("/:id").delete(deleteNotification)

module.exports= router