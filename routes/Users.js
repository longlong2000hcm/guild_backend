const router = require('express').Router()
const User = require('../models/User')
const has = require('has-value');
const bcrypt = require('bcryptjs');
const saltRounds = 4;

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

    let newUser = new User({ username, password, email })
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


module.exports = router