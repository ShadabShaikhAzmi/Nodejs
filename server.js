const env = require('dotenv').config();
const express = require('express');
const app = express();
var logger = require('node-color-log');

app.use(express.json());
app.use('/api',require('./routes/api'));
require('./database/db');

app.listen(process.env.PORT,()=>{
    logger.info(`server is running on port ${process.env.PORT}`);
});






