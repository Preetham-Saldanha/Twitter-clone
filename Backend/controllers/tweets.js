const { StatusCodes } = require("http-status-codes")
const asyncWrapper = require("../middleware/asyncWrapper")
const db = require("../db/connect")
const Tweet = require("../Models/tweet")



const getAllTweets = asyncWrapper(async (req, res) => {

    console.log(req.file)
    const [rows, feilds] = await db.execute("SELECT * FROM `twitter-clone`.tweets ORDER BY created_at DESC")
    res.status(StatusCodes.OK).json({ tweets: rows })
    console.log("getAllTweets is printed")

})

const postTweet = asyncWrapper(async (req, res, next) => {
    console.log("adding tweet was attempted")
    console.log("files are",req.files)
    const tweet_image_path = req.file?.filename
    const { username, tweet_text } = req.body
    const date = new Date()

    const created_at = `${date.toISOString().slice(0, 10)} ${date.toTimeString().slice(0, 8)}`
    const tweet = new Tweet(null,username, tweet_text, created_at, 0,0, tweet_image_path)
    const result = await tweet.Post()

    res.status(StatusCodes.OK).json(result)
})

const deleteTweet = asyncWrapper(async (req, res, next) => {
    const _id = req.params.id;

    const result = await db.execute(`DELETE FROM tweets WHERE tweet_id = '${_id}'`)

    if (result[0].affectedRows === 1) {
        res.status(StatusCodes.OK).json(result)
    }
    else if (result[0].affectedRows === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `tweet not found for id ${_id}` })
    }

})

const updateTweet = asyncWrapper(async (req, res, next) => {
    const _id = req.params.id;

    let rt_count = 0;
    let ft_count = 0;

    const new_url = new URL(`http://localhost:5000/${req.url}`)

    const retweet_count = new_url.searchParams.get('retweet_count');
    const favorite_count = new_url.searchParams.get('favorite_count')


    const [countValues, feids] = await db.execute(`SELECT retweet_count,favorite_count FROM tweets WHERE tweet_id=${_id}`)

    console.log("this count", countValues)
    if (favorite_count === '1') {
        ft_count = countValues[0].favorite_count + 1;
    }
    if (retweet_count === '1') {
        rt_count = countValues[0].retweet_count + 1;
    }
    const result = await db.execute(`UPDATE tweets SET retweet_count='${rt_count}' , favorite_count='${ft_count}' WHERE tweet_id='${_id}'`)
    res.status(StatusCodes.OK).json(result)
})



module.exports = { getAllTweets, postTweet, deleteTweet, updateTweet }

