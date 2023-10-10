const http = require('https')
const app = require('./app')
const fs = require('fs')

const port = 3000

//create server on port 3000
const server = http.createServer({
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
    passphrase: 'apds'
}, app)

server.listen(port)
