var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/:page', function(req, res, next) {
  var mySqlClient = mysql.createConnection({
    user : 'root',
    password : 'eocla880714',
    database : 'gallerydb'
  });
  
  fs.readFile('views/main.html', 'utf8', function(error, data){
  mySqlClient.query('select * from postdb ORDER BY created_at DESC', function(error, results){
    if(error){
      console.log('error : ', error.message);
      next(error);
    }else{
      console.log(results);
      res.send( ejs.render(data, {
        prodList : results
      }));
    }});
  });
});

module.exports = router;