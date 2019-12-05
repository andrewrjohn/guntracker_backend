const mongoose = require('mongoose')

const {
    DB_CONNECTION_STRING
} = process.env

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`Connected to database: ${DB_CONNECTION_STRING}`)
});