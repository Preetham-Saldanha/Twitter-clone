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
const userRoutes = require('./routes/user')
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

  //  const [row, feilds] = await db.execute(query)
  //   console.log(row, feilds)

  
  } catch (error) {
    console.log(error);
  }
};

start();