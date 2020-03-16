var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

router.post('/', function (req, res, next) {
  if (req.session.authId !== undefined) {
    return res.send();
  }

  var mySqlClient = mysql.createConnection({
    user: 'root',
    password: 'eocla880714',
    database: 'gallerydb'
  });

  mySqlClient.query(`select * from userdb where id = '${req.body.id}' AND password = '${req.body.password}'`, function (error, results) {
    if (error) {
      console.log('error : ', error.message);
      next(error);
    } else {
      if (results[0] !== undefined) {
        req.session.authId = results[0].id;

        //세션 스토어가 이루어진 후 redirect를 해야함.
        req.session.save(function () {
          try {
            res.send(results);
          } catch (error){
            console.log(error);
          }
        });
      } else {
        res.status(500).send(results);
      }
    }
  });
});

module.exports = router;