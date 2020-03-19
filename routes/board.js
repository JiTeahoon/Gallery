var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');

router.get('/', function (req, res, next) {
  if (req.session.authId === undefined) {
    return res.redirect('http://localhost:3000');
  }
  var query;
  //0 제목 1 아이디 2 유저이름
  if (req.query.s_type === undefined) {
    query = `select * from postdb ORDER BY created_at `;
  } else {
    if (req.query.s_type === "0") {
      query = `select * from postdb where postdb.title LIKE '%${req.query.s_keyword}%' ORDER BY postdb.created_at`;
    } else if (req.query.s_type === "1") {
      query = `select * from postdb where postdb.id LIKE '%${req.query.s_keyword}%' ORDER BY postdb.created_at`;
    } else {
      query = `select postdb.postIdx, postdb.id, postdb.title , postdb.created_at from postdb LEFT join userdb on userdb.id = postdb.id WHERE userdb.name = '${req.query.s_keyword}' ORDER BY postdb.created_at`;
    }
  }

  fs.readFile('views/main.html', 'utf8', function (error, data) {
    req.app.get('mysql').query(query, function (error, results) {
      if (error) {
        console.log('error : ', error.message);
        next(error);
      } else {
        res.send(ejs.render(data, {
          prodList: results,
          name: req.session.authId
        }));
      }
    });
  });
});

router.get('/write', function (req, res, next) {
  try{
    res.redirect('http://localhost:3000/write');
  }catch(error){
    console.log(error);
  }
});

module.exports = router;