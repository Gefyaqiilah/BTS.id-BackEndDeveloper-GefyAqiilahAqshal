const actionQuery = require('../helpers/actionQuery');

const shopping = {
  newShopping: (payload) => {
    return actionQuery('INSERT INTO shopping SET ?', payload)
  },
  getDataByDate: (date) => {
    return actionQuery('SELECT * FROM shopping WHERE CreatedDate = ?', date)
  },
  getAllShopping: () => {
    return actionQuery('SELECT * FROM shopping')
  },
  getById: (id) => {
    return actionQuery('SELECT * FROM shopping WHERE Id = ?', id)
  },
  deleteShopping: (id) => {
    return actionQuery('DELETE FROM shopping WHERE Id = ?', id)
  },
  updateShopping: (id, payload) => {
    return actionQuery('UPDATE shopping SET ? WHERE id = ?', [payload, id])
  } 
}

module.exports = shopping