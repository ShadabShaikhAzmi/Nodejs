const mongoose = require('mongoose');
const logger = require('node-color-log');

let db = mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(()=>{
    logger.info(`database connected successfully`)
  }).catch((err)=>{
    logger.error(`error occured: ${err}`)
  });

module.exports = db;

