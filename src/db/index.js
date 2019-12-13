const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = process.env;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
});