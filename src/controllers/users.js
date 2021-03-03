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
          await userModels.signUp(data)
          res.status(200).json({message: 'user has been created'})
        } catch (error) {
          res.status(500).json(error)
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
      if (dataUser.length === 0 ) {
        return res.status(404).json({message: 'invalid email'})
      }
      const match = await bcrypt.compare(password, dataUser[0].password)
      if (!match) {
        res.status(404).json({message: 'email or password invalid'})
      }
      const token = await jwt.sign({username: dataUser[0].username, email: email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '7d' })
      res.json({
        email,
        token: token,
        username: dataUser[0].username
      })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const usersData = await userModels.getAllUser()
      res.status(200).json(usersData)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = usersController