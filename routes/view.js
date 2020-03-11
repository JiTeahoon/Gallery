var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res, next) {
    var mySqlClient = mysql.createConnection({
        user: 'root',
        password: 'eocla880714',
        database: 'gallerydb'
    });

    var query = `select * from postdb where postIdx = ${req.query.page}`;
    console.log(query);

    fs.readFile('views/view.html', 'utf8', function (error, data) {
        mySqlClient.query(query, function (error, viewresult) {
            if (error) {
                console.log('error : ', error.message);
                next(error);
            } else {
                console.log(viewresult);
                res.status(201).json(viewresult);
            }
        });
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
            res.send(ejs.render(data, {
                commentList: commentresults
            }));
        }
    })
});

router.post('/', function (req, res, next) {
});

module.exports = router;