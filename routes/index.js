var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res, next) {
  // var mySqlClient = mysql.createConnection({
  //   user: 'root',
  //   password: 'eocla880714',
  //   database: 'gallerydb'
  // });

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
