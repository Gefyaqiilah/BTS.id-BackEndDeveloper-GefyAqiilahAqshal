const dbConnection = require('../configs/db');

const actionQuery = (...arg) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(...arg, (err, results) => {
      if (!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })

  })
}

module.exports = actionQuery