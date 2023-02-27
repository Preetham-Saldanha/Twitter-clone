const express = require("express")
const router = express.Router()
// const { getAllTweets, postTweet, deleteTweet, updateTweet } = require("../controllers/tweets")
const multer = require('multer')
const path = require('node:path');
const { removeProfileImage , updateUser, getUserProfile, addFollower, unFollow, is} = require("../controllers/user")
const {isFollowing}= require("../controllers/tweets")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profileImages')
    },
    filename: function (req, file, cb) {
        console.log(file.filename)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image')

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error:Images only')
    }

}

router.route('/:id').get(getUserProfile)

router.route('/').
post((req, res, next) => {
    upload(req, res, next, async function (err) {
        if (err) {
            console.log(err)
        }
        console.log(req.files)
    })
    console.log("the files are",req.body)
}, updateUser)


router.route('/follow').post(addFollower)

router.route('/unfollow').post(unFollow)

router.route('/isfollowing/:id').get(isFollowing)
// router.route('/removeProfileImage').delete(removeProfileImage)

module.exports = router