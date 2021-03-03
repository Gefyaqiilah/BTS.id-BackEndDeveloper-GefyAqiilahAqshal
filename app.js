require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 4000
const routes = require('./src/routes/index');

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)
// global endpoint 
app.use('*', (req, res, next) => {
  res.json({message: 'wrong endpoint'})
})

// error handling
app.use((err, req, res, next) => {
  res.send('something error')
})

app.listen(PORT, () => console.log('server running on port: ', PORT))