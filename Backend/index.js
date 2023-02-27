const express = require('express');
const app = express();
const tweetRoutes = require('./routes/tweets');
require('dotenv').config();
const bodyParser = require("body-parser")
const cors = require('cors')
const authenticate = require("./middleware/authentication")
// const notFound = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require("./db/connect")
const db = connectDB
const authRoutes = require("./routes/auth")

const refreshRoute = require("./routes/refresh")
const logoutRoute = require("./routes/logout");
const userRoutes = require('./routes/user');
const notificationsRoutes = require("./routes/notifications")
const { getAllTweets } = require('./controllers/tweets');
const { getUserProfile } = require('./controllers/user');



// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({ origin: `${process.env.ORIGIN_URL}` , credentials: true, methods:["GET,HEAD,PUT,PATCH,POST,DELETE"]}))
app.use(cors({ origin: `http://localhost:3000`, credentials: true, methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"] }))
app.use(express.static('public'));
app.use(express.json());

// routes

app.use('/api/v1/user', authenticate, userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/refresh', refreshRoute)
app.use('/api/v1/logout', logoutRoute)
app.use('/api/v1/notification', authenticate, notificationsRoutes);

app.get('/api/v1/tweet/:id', getAllTweets)
app.use('/api/v1', authenticate, tweetRoutes);


// app.get('api/v1/user/:id',getUserProfile)



// app.use(notFound);
// app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

    //     const query = `CREATE TABLE users (
    //       id INT AUTO_INCREMENT PRIMARY KEY,
    //       username VARCHAR(255) NOT NULL,
    //       password VARCHAR(255) NOT NULL,
    //       email VARCHAR(255) NOT NULL,
    //       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //       profile_image_path VARCHAR(255),
    //       followers INT DEFAULT 0,
    //       following INT DEFAULT 0
    //     );

    // const query =`CREATE TABLE retweets (
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   username VARCHAR(255) NOT NULL,
    //   tweet_id INT NOT NULL
    // )`
    // const query =`CREATE TABLE likes (
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   username VARCHAR(255) NOT NULL,
    //   tweet_id INT NOT NULL
    // )`

    // const query = `ALTER TABLE tweets ADD reply_to varchar(255)  DEFAULT "-1"`

    // const query = `ALTER TABLE users,
    // ADD firstname varchar(255),
    // ADD lastname varchar(255);`
    // const query = `ALTER TABLE users ADD bio VARCHAR(160)`

    // const query = `ALTER TABLE tweets ADD profile_image_path varchar(255)`

    // const query = `CREATE TABLE refreshTokens (
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   username VARCHAR(255) NOT NULL,
    //   token VARCHAR(255) NOT NULL
    // );
    // `
    // const [row, feilds] = await db.execute(query)
    // console.log(row, feilds)


    //     UPDATE table1
    // SET firstname = table2.firstname, lastname = table2.lastname
    // FROM table2
    // WHERE table1.id = table2.id;

    //  const query = `CREATE TABLE followers (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     follower VARCHAR(255) NOT NULL,
    //     following VARCHAR(255) NOT NULL
    //   )`;

    // const query = `DELETE  FROM tweetotherinfo `
    // const query = `CREATE TABLE tweetotherinfo ( follower VARCHAR(255), tweet_id INT, retweeted INT DEFAULT 0, liked INT DEFAULT 0, following VARCHAR(255) DEFAULT "-1")`
    
    // const query = ` UPDATE users SET followers= 0, following=0 `
    // const query = ` UPDATE tweets SET favorite_count= 0, retweet_count=0  `
    
    // const query = `DELETE  FROM notifications`

    // const query = `CREATE TABLE notifications (id INT AUTO_INCREMENT PRIMARY KEY, celebrity VARCHAR(255), fan VARCHAR(255), profile_image_path VARCHAR(255) DEFAULT "-1", tweet_id INT DEFAULT -1, notify_type VARCHAR(30), has_read INT DEFAULT 0)`
    // const [row, feilds] = await db.execute(query)
    // console.log(row, feilds)

//     const query = `ALTER TABLE notifications ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP`
//  const [row, feilds] = await db.execute(query)
//  console.log(row, feilds)
  } catch (error) {
    console.log(error);
  }
};

start();