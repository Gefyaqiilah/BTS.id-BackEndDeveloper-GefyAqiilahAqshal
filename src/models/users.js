const actionQuery = require('../helpers/actionQuery');

const usersModel = {
  signUp: (payload) => {
    return actionQuery('INSERT INTO user SET ?', payload)
  },
  getUserPassword: (email) => {
    return actionQuery('SELECT password, username FROM user WHERE email = ?', email)
  },
  getAllUser: () => {
    return actionQuery('SELECT * FROM user')
  }
}

module.exports = usersModel