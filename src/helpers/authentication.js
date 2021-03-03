const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]

  if (!accessToken) {
    res.status(401).json({message: 'Forbidden: Token cannot be empty'})
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (error, results) => {
    if(!error){
      req.user = results
      return next()
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({message: 'Access Token expired'})
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({message: 'Invalid Token'})
    }
  })
}

module.exports = authentication