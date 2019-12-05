const express = require('express')
const routers = require('./routers')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()
require('./db')
require('./models')

const {
    PORT
} = process.env

app.use(bodyParser.json())

app.use('/api/v1', routers)

app.listen(PORT, () => console.log(`API server listening on port ${PORT} 🎉`))