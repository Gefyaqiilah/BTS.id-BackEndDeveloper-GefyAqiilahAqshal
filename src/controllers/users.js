const userModels = require('../models/users');
const bcrypt = require('bcrypt');
const usersModel = require('../models/users');
const jwt = require('jsonwebtoken');

const usersController = {
  signUp: (req, res, next) => {
    const {user} = req.body
    bcrypt.genSalt(10, (err ,salt) => {
      bcrypt.hash(user.encrypted_password, salt, async (err, hash) => {
        const data = {
          ...user,
          password: hash
        }
        delete data.encrypted_password
        
        try {
          const cek = await userModels.signUp(data)
          res.json(cek)
        } catch (error) {
          res.json(error)
        }
      })
    })
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      res.json({message: 'email or password cannot be empty'})
    }
    try {
      const dataUser = await usersModel.getUserPassword(email)
      const match = await bcrypt.compare(password, dataUser[0].password)
      if (!match) {
        res.json({message: 'email or password invalid'})
      }
      const token = await jwt.sign({username: dataUser[0].username, email: email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '7d' })
      res.json({
        email,
        token: token,
        username: dataUser[0].username
      })
    } catch (error) {
      res.json(error)
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const usersData = await userModels.getAllUser()
      res.json(usersData)
    } catch (error) {
      res.json(error)
    }
  }
}

module.exports = usersController