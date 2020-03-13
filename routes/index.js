var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.authId !== undefined) {
    return res.redirect('http://localhost:3000/board');
  }

  fs.readFile('views/login.html', 'utf8', function (error, data) {
    if (error) {
      console.log('error : ', error.message);
      next(error);
    } else{
      res.send(data);
    }
  });
});

module.exports = router;
