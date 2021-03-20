const env = require('dotenv');
const express = require('express');
const app = express();
var logger = require('node-color-log');
env.config();
app.use(express.json());
app.use(require('./routes/api'));
require('./database/db');


app.listen(process.env.PORT,()=>{
    logger.info(`server is running on port ${process.env.PORT}`);
});






