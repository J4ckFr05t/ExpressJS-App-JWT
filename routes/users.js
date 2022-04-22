var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const MachineSchema = require('../model/user')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()


router.post('/login', (req,res)=>{
  const {machine, password} =  req.body
  MachineSchema.find({machine : machine})
  .exec()
  .then(mach =>{
    if(mach.length<1){
      return res.status(401).sendFile(path.join(__dirname, "../public", "401.html"));
    }
    bcrypt.compare(req.body.password,mach[0].password, (err,result) =>{
      if(err){
        return res.status(401).sendFile(path.join(__dirname, "../public", "401.html"));
      }
      if(result){
        const token = jwt.sign({
          machine : mach[0].machine,
          machid : mach[0]._id
        },process.env.secret_key,{
          expiresIn : "1h"
        })
        var date = new Date(mach[0].createdAt);

        return res.status(200).header('auth-token',token).render('index.ejs',{title : req.body.machine, machine : req.body.machine, date : date.toDateString()})
      }
      return res.status(401).sendFile(path.join(__dirname, "../public", "401.html"));
    })
  })
  .catch(error =>{
    return res.status(401).sendFile(path.join(__dirname, "../public", "500.html"));
  })
})

router.post('/register',async (req,res)=>{
  bcrypt.hash(req.body.password, 15, (error, hashPass)=>{
    if(error){
      res.json({
        message : error
      })
    }
    else{
      let newMachine =  new MachineSchema({
        idcard : req.body.idcard,
        machine : req.body.machine,
        password : hashPass
      })
      
      newMachine.save()
      .then(machine =>{
        console.log(machine)
        res.json({
          message : req.body.machine+" added successfully"
        })
      })
      .catch(err=>{
        res.json({
          message : err
        })
      })

    }
  })
})

router.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = path.join(__dirname,"../uploads", sampleFile.name)

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('<script>alert("file uploaded"); window.location.href = "/machines/login";</script>')
  });
})

module.exports = router;
