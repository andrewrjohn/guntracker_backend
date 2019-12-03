const express = require('express')
const usersRouter = require('./routers/users')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/guntracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to database: guntracker")
});

const port = 3000

app.use(bodyParser.json())

app.use('/api/v1', usersRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))