const express = require('express');
const route = express.Router();
const mainController = require('../app/Https/Controller/MainController'); 
const {isUser} = require('../middleware/User');
const {isAuth} = require('../middleware/Authenticate');
const authenticateController = require('../app/Https/Controller/Authenticate');

route.get('/',(req,res)=>mainController().main(req,res));
route.post('/register',(req,res)=>authenticateController().Register(req,res));
route.post('/login',(req,res)=>authenticateController().Login(req,res));

route.all('*',(req,res)=>res.send(`<center><h3 style="color:grey">404 not found</h3></center>`))
module.exports = route;