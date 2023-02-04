const mysql = require('mysql2');
require("dotenv").config()
 const pool=  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:"twitter-clone"
  });

  const poolPromise = pool.promise()


module.exports= poolPromise;