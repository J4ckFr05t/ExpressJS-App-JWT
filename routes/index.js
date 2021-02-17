var express = require('express');
var path = require('path');

var router = express.Router();
const User = require('../model/user')

router.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname, "../public", "register.html"));
})

module.exports = router;
