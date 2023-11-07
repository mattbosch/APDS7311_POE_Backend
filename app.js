require('dotenv').config()
const express = require('express')
const app = express()
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore()
const https = require('https')
const fs = require('fs')
const helmet = require('helmet')
const hsts = require('./middleware/hsts')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const bruteforce = new ExpressBrute(store)

//Cater for CORS
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' http://localhost:4200"
      );
    next()
})

//Attempt to establish connection to MongoDB
mongoose.connect(process.env.MONGODB)
.then(()=>
{
    console.log('MongoDB Connection Established.')
})
.catch((error)=>
{
    console.log('MongoDB Connection Error.', error)
})

//Applying middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(cors({ origin: 'http://localhost:4200', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', optionSuccessStatus: 204}))
app.use(express.json())
app.use(hsts)

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/posts', require('./routes/posts'))

module.exports = app