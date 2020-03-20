var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    fs.readFile('views/user-register.html', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
            next(error);
        } else {
            res.send(data);
        }
    })
});

router.get('/overlap', function (req, res, next) {
    console.log(req.query);
    var query = `SELECT * FROM userdb where id = '${req.query.overlap}'`;

    req.app.get('mysql').query(query, function (error, results) {
        if (error) {
            console.log(`it fail parse ${query}`);
            console.log('error : ', error.message);
            next(error);
        } else if (results[0] === undefined) {
            res.send(results);
        }
        else {
            res.status(500).send(results);
        }
    });
})

router.post('/register', function (req, res, next) {
    var query = `SELECT * FROM userdb where id = '${req.body.id}'`

    req.app.get('mysql').query(query, function (error, results) {
        if (error) {
            next(error);
        } else if (results[0] === undefined) {

            query = ` INSERT INTO userdb (id, password, name) VALUES ('${req.body.id}', '${req.body.password}', '${req.body.name}')`;

            req.app.get('mysql').query(query, function (error, results) {
                if (error) {
                    next(error)
                } else {
                    res.send(results);
                }
            });
        }
        else {
            res.status(500).send(results);
        }
    });
});

router.get('/cancel', function (req, res, next) {
    res.redirect('http://localhost:3000/board');
});

module.exports = router;
