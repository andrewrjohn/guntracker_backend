const express = require('express')
const authRouter = require('./routers/auth')
const gunsRouter = require('./routers/guns')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Ammo')
require('./models/Gun')
require('./models/User')
require('./models/Token')
require('dotenv').config()

mongoose.connect('mongodb://localhost/guntracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database: guntracker")
});

const port = 3000

app.use(bodyParser.json())

app.use('/api/v1', [authRouter, gunsRouter])

app.listen(port, () => console.log(`Example app listening on port ${port}!`))