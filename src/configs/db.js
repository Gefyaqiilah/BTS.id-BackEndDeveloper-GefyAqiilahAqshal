const mysql = require('mysql2');

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = process.env
const dbConnection = mysql.createConnection({
  host: DB_HOST, 
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD
})

module.exports = dbConnection