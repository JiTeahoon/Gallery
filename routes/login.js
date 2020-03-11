var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.post('/', function(req, res, next) {
  var mySqlClient = mysql.createConnection({
    user : 'root',
    password : 'eocla880714',
    database : 'gallerydb'
  });
  
  console.log(`select * from userdb where Id = ${req.body.id} AND password = ${req.body.password}`);
  mySqlClient.query(`select * from userdb where Id = '${req.body.id}' AND password = '${req.body.password}'`, function(error, results){
    if(error){
      console.log('error : ', error.message);
      next(error);
    }else{
      console.log(results.length);
      res.send(results);
    }});
});

module.exports = router;