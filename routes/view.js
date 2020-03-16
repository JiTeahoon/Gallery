var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.authId === undefined) {
        console.log('is not login!');
        return res.redirect('http://localhost:3000');
    }

    var mySqlClient = mysql.createConnection({
        user: 'root',
        password: 'eocla880714',
        database: 'gallerydb'
    });

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

    mySqlClient.query(query, function (error, viewresult) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            if (viewresult[0] !== undefined) {
                query = `select * from commentdb where postIndex = ${req.query.page} ORDER BY created_at DESC`;
                mySqlClient.query(query, function (error, commentresults) {
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
    mySqlClient.query(query, function (error, commentresults) {
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

router.post('/commentregister', function (req, res, next) {
    var idx = parseInt(`${req.body.idx}`);
    var comment = req.body.comment;
    var id = req.session.authId;

    var query = `INSERT INTO commentdb (postIndex, comment, created_at, id) VALUES (${idx}, '${comment}', CURRENT_TIMESTAMP, '${id}')`;

    var mySqlClient = mysql.createConnection({
        user: 'root',
        password: 'eocla880714',
        database: 'gallerydb'
    });

    mySqlClient.query(query, function (error, result) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            res.send(result);           
        }
    });
});

router.delete('/delete', function(req, res, next){
    var idx = parseInt(`${req.body.idx}`);
    var query = `SELECT * FROM commentdb WHERE postIndex = ${req.body.postIndex}`;

    mySqlClient.query(query, function (error, result) {
        if (error) {
            console.log('error : ', error.message);
            next(error);
        } else {
            if(result[idx] === undefined || result[idx].id !== req.session.authId){
                res.status(500).send("is not match id");
                return;
            }

            var query = `DELETE * FROM commentdb WHERE postIndex = '${result[idx].postIndex}' AND id = '${result[idx].postIndex}' AND created_at = '${result[idx].created_at}'`;
            mySqlClient.query(query, function (error, result) {
                if (error) {
                    console.log('error : ', error.message);
                    next(error);
                } else {
                    res.send(result);           
                }
            });
        }
    });
});
// router.comment('/', function (req, res, next) {
// });

module.exports = router;