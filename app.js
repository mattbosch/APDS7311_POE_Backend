require('dotenv').config()
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const helmet = require('helmet')
const hsts = require('./middleware/hsts')
const mongoose = require('mongoose')
const cors = require('cors')

//Cater for CORS
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods', '*')
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

app.use(helmet())
app.use(cors({ origin: 'https://localhost:3000', optionSuccessStatus: 200}))
app.use(express.json())
app.use(hsts)

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/posts', require('./routes/posts'))

module.exports = app