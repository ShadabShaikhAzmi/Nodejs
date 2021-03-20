const express = require('express');
const route = express.Router();
const mainController = require('../app/Https/Controller/MainController'); 

route.get('/',(req,res)=>mainController().main(req,res));


module.exports = route;