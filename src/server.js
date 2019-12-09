const express = require('express');
const routers = require('./routers');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
require('./models');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());

app.use('/api/v1', routers);

app.listen(PORT || 3000, () => console.log(`API server listening on port ${PORT || 3000} 🎉`));