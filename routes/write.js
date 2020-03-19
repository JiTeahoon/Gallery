var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    // if (req.session.authId === undefined) {
    //     console.log('is not login!');
    //     return res.redirect('http://localhost:3000');
    // }

    fs.readFile('views/write.html', 'utf8', function (error, data) {
        if(error){
            console.log(error);
            next(error);
        } else {
            res.send(data);
        }
    })
});

router.post('/register', function (req, res, next) {
    var query = `INSERT INTO postdb (postIdx, id, title, post, created_at) VALUES (NULL, '${req.session.authId}', '${req.body.title}', '${req.body.post}', CURRENT_TIMESTAMP)`

    req.app.get('mysql').query(query, function (error, results) {
        if (error) {
            console.log(`it fail parse ${query}`);
            console.log('error : ', error.message);
            next(error);
        } else {
            console.log(`it connect search in parse ${query}`);

            res.send(results);
        }
    });
});

router.get('/cancel', function (req, res, next) {
    res.redirect('http://localhost:3000/board');
});

module.exports = router;
