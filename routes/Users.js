const router = require('express').Router()
const User = require('../models/User')
const has = require('has-value');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 4;
const secret = "h e n t a i";


function validateContentTypeHeaders(req, res, next) {
    if (req.get("content-type") === 'application/json') {
        next();
    }
    else {
        res.status(400).json({ message: 'Bad Request - Wrong or missing headers' });
    }
}

router.post('/register', validateContentTypeHeaders, (req, res) => {
    console.log("Register route invoked");

    let requiredFields = ["username", "password", "email"];
    let missingFields = [];
    requiredFields.forEach(x => {
        if (!has(req.body, x)) { missingFields.push(x) }
    })
    let errMsg = "Missing ";
    if (missingFields.length > 0) {
        missingFields.forEach(x => { errMsg += x + " "; })
        res.status(400).json({ message: errMsg });
        return null;
    }

    let username = req.body.username.trim();
    let password = req.body.password.trim();
    let email = req.body.email.trim();

    if (typeof password === "string") {
        bcrypt.hash(password, saltRounds).then(hash => {
            let newUser = new User({ username, password: hash, email })
            newUser.save(err => {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        err,
                        success: false
                    })
                } else {
                    res.status(200).json({
                        success: true
                    })
                }
            })
        })
    }
})

router.post('/login', validateContentTypeHeaders, (req, res) => {
    console.log("Login route invoked");

    let requiredFields = ["username", "password"];
    let missingFields = [];
    requiredFields.forEach(x => {
        if (!has(req.body, x)) { missingFields.push(x) }
    })
    let errMsg = "Missing ";
    if (missingFields.length > 0) {
        missingFields.forEach(x => { errMsg += x + " "; })
        res.status(400).json({ message: errMsg });
        return null;
    }

    let username = req.body.username.trim();
    let password = req.body.password.trim();
    User.find({ username: username }).then(dbResults => {
        if (dbResults.length == 0) {
            res.status(401).json({
                sucess: false,
                token: null,
                message: 'Username or password is incorrect'
            });
            return null;
        }
        bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
            if (bcryptResult == true) {
                let token = jwt.sign({ id: dbResults[0]._id, username: dbResults[0].username }, secret); // Sigining the token
                res.status(200).json({
                    sucess: true,
                    err: null,
                    idUser: dbResults[0]._id,
                    username: dbResults[0].username,
                    token
                });
            }
            else {
                res.status(400).json({ message: "Wrong password" });
            }
        })
    })

})


module.exports = router