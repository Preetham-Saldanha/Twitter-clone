const { StatusCodes } = require("http-status-codes")
const asyncWrapper = require("../middleware/asyncWrapper")
const db = require("../db/connect")
const Tweet = require("../Models/tweet")



const getAllTweets = asyncWrapper(async (req, res) => {
    const pagenumber = req.params.id;
    const [count, feilds] = await db.execute(`SELECT COUNT(tweet_id) FROM tweets `)
    console.log(count)
    if (pagenumber === "-1") {

        const [rows, feilds] = await db.execute(`SELECT * FROM tweets ORDER BY created_at DESC LIMIT 10`)
        console.log(rows)
        res.status(StatusCodes.OK).json({ tweets: rows, count: count[0]['COUNT(tweet_id)'] })
        console.log("getAllTweets is printed")

    } else {

        const [rows, feilds] = await db.execute(`SELECT * FROM tweets WHERE tweet_id < ${pagenumber}  ORDER BY created_at DESC LIMIT 10`)
        console.log(rows)
        res.status(StatusCodes.OK).json({ tweets: rows, count: count[0]['COUNT(tweet_id)'] })
        console.log("pageinated ")
    }


})

const postTweet = asyncWrapper(async (req, res, next) => {
    console.log("adding tweet was attempted")
    console.log("files are", req.files)
    const tweet_image_path = req.file?.filename
    const { username, tweet_text, firstname, lastname, profile_image_path ,reply_to} = req.body
    const date = new Date()

    const created_at = `${date.toISOString().slice(0, 10)} ${date.toTimeString().slice(0, 8)}`
    const tweet = new Tweet(null, username, tweet_text, created_at, 0, 0, tweet_image_path , firstname, lastname, profile_image_path, reply_to)
    const result = await tweet.Post()

    res.status(StatusCodes.OK).json(result)
})

const deleteTweet = asyncWrapper(async (req, res, next) => {
    const _id = req.params.id;
    const [oldRow, oldFeilds] = await db.execute(`SELECT tweet_image_path FROM tweets WHERE id="${_id}`)

    if (oldRow[0].tweet_image_path) {
        const result = await db.execute(`DELETE FROM tweets WHERE tweet_id = '${_id}'`)
        fs.unlink("/public/tweetImages/" + profile_image_path, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        })

    }
    if (result[0].affectedRows === 1) {
        res.status(StatusCodes.OK).json(result)
    }
    else if (result[0].affectedRows === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `tweet not found for id ${_id}` })
    }

})

const updateTweet = asyncWrapper(async (req, res, next) => {
    const _id = req.params.id;
    // console.log(req.body)
    // const { username } = req.body;
    let rt_count = 0;
    let ft_count = 0;

    const new_url = new URL(`http://localhost:5000/${req.url}`)
    console.log(new_url, 'url')
    const retweet_count = new_url.searchParams.get('retweet_count');
    const favorite_count = new_url.searchParams.get('favorite_count')
    const username = new_url.searchParams.get('username')
    if (!username) return

    const [countValues, feids] = await db.execute(`SELECT retweet_count,favorite_count FROM tweets WHERE tweet_id=${_id}`)

    console.log("this count", countValues)
    if (favorite_count === '1') {
        ft_count = countValues[0].favorite_count + 1;
        await db.execute(`INSERT INTO likes (username,tweet_id) VALUES ('${username}', '${_id}')`)

    }
    else if (favorite_count === '-1') {
        ft_count = countValues[0].favorite_count - 1
        await db.execute(`DELETE FROM likes WHERE username='${username}' AND tweet_id='${_id}'`)

    }
    else {
        ft_count = countValues[0].favorite_count
    }

    if (retweet_count === '1') {
        rt_count = countValues[0].retweet_count + 1;
        await db.execute(`INSERT INTO retweets (username,tweet_id) VALUES('${username}', '${_id}')`)


    } else if (retweet_count === '-1') {
        rt_count = countValues[0].retweet_count - 1
        await db.execute(`DELETE  FROM retweets WHERE username='${username}' AND tweet_id='${_id}'`)
    }
    else {
        rt_count = countValues[0].retweet_count
    }

    console.log("counts", rt_count, ft_count)
    const result = await db.execute(`UPDATE tweets SET retweet_count='${rt_count}' , favorite_count='${ft_count}' WHERE tweet_id='${_id}'`)
    res.status(StatusCodes.OK).json(result)


})

const getRetweetAndLikeInfo = asyncWrapper(async (req, res, next) => {
    const { username, tweet_id } = req.body;
    
// console.log(row)
    if (username) {
        const [likeInfo] = await db.execute(`SELECT * FROM likes WHERE username="${username}" AND tweet_id="${tweet_id}"`)
        const [retweetInfo] = await db.execute(`SELECT * FROM retweets WHERE username="${username}" AND  tweet_id="${tweet_id}"`)
        console.log("observe",likeInfo,retweetInfo)
        res.status(StatusCodes.OK).json({ result: { likeInfo: likeInfo[0]?.username === username, retweetInfo: retweetInfo[0]?.username === username } })
    }
    else res.status(StatusCodes.OK).json({ result: { likeInfo: false, retweetInfo: false } })
})



module.exports = { getAllTweets, postTweet, deleteTweet, updateTweet, getRetweetAndLikeInfo }

