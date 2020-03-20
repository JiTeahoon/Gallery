var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.authId === undefined) {
        console.log('is not login!');
        return res.redirect('http://localhost:3000');
    }

    var query = `select * from postdb where postIdx = ${req.query.page}`;

    var viewpage;
    fs.readFile('views/view.html', 'utf8', function (error, result) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        }
        else {
            viewpage = result;
        }
    });
    var commentpage;
    fs.readFile('views/comment.html', 'utf8', function (error, result) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            commentpage = result;
        }
    });

    req.app.get('mysql').query(query, function (error, viewresult) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            if (viewresult[0] !== undefined) {
                query = `select * from commentdb where postIndex = ${req.query.page} ORDER BY created_at DESC`;
                req.app.get('mysql').query(query, function (error, commentresults) {
                    if (error) {
                        console.log('error : ', error.message);
                        next(error);
                    } else {
                        var boardpage = ejs.render(viewpage, {
                            title: viewresult[0].title,
                            post: viewresult[0].post,
                            postIdx: viewresult[0].postIdx,
                            comment: ejs.render(commentpage, {
                                commentList: commentresults
                            })
                        });

                        res.send(boardpage);
                    }
                });
            } else {
                console.log('error : ', error.message);
                next(error);
            }
        }
    });
});

router.get('/comment', function (req, res, next) {
    query = `select * from commentdb where postIndex = ${req.query.page} ORDER BY created_at DESC`;
    req.app.get('mysql').query(query, function (error, commentresults) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            console.log(commentresults);
            ejs.render(data, {
                commentList: commentresults
            });

            res.send(ejs.render(data, {
                commentList: commentresults
            }));
        }
    })
});

router.post('/register', function (req, res, next) {
    var idx = parseInt(`${req.body.boardIdx}`);
    var comment = req.body.commentinput;
    var id = req.session.authId;

    var query = `INSERT INTO commentdb (commentIdx ,postIndex, comment, created_at, id) VALUES (NULL ,${idx}, '${comment}', CURRENT_TIMESTAMP, '${id}')`;

    req.app.get('mysql').query(query, function (error, result) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            res.send(result);           
        }
    });
});

router.delete('/delete', function (req, res, next) {
    var boardIdx = req.body.boardIdx;
    var Idx = req.body.commentIdx;
  
    var query = `SELECT * FROM commentdb WHERE postIndex = ${boardIdx} ORDER BY created_at DESC`;
  
    //게시판 댓글 검색
    req.app.get('mysql').query(query, function (error, results) {
      if (error) {
        console.log(error);
        next(error);
      } else {
        if (results[Idx] !== undefined){
          if(req.session.authId !== results[Idx].id){
            res.status(500).send(results);
            return;
          }

          query = `DELETE FROM commentdb WHERE commentIdx = ${results[Idx].commentIdx}`;
  
          req.app.get('mysql').query(query, function (error, results) {
            if (error) {
              console.log(error);
              next(error);
            } else {
              res.send();
            }
          });
        } else {
          res.status(500).send(results);
        }
      }
    });
  });
// router.comment('/', function (req, res, next) {
// });

module.exports = router;