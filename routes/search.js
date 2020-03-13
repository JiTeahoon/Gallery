var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

router.post('/', function (req, res, next) {  
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
          console.log(results[0].id);
          req.session.authId = results[0].id;
          // req.session.author_id = result[0].id;
          // req.session.isLogined = true;
          //세션 스토어가 이루어진 후 redirect를 해야함.
          req.session.save(function () {
            try {
              //res.redirect('/board');
              res.status(201).send();
            } catch {
              console.log('쿠키 저장 실패');
            }
          });
        } else {
          res.status(500).send(results);
        }
      }
    });
  });
  
  module.exports = router;