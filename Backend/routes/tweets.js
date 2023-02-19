const express = require("express")
const router = express.Router()
const { getAllTweets, postTweet, deleteTweet, updateTweet, getRetweetAndLikeInfo } = require("../controllers/tweets")
const multer = require('multer')
const path = require('node:path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tweetImages')
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
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error:Images only')
    }

}

router.route('/test').post((req, res, next)=>{
    console.log("testing post api...",req.body.message)
})

router.route('/tweet').
post((req, res, next) => {
    upload(req, res, next, async function (err) {
        if (err) {
            console.log(err)
        }
        console.log("the files are twwet",req.files)    
    })
    // console.log("the files are",req.files)
}, postTweet)


router.route('/tweet/:id').delete(deleteTweet).post(updateTweet)

router.route('/retweetandlikeinfo').post(getRetweetAndLikeInfo)

module.exports = router
