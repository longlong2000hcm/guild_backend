const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = function (token) {
    return function (req, res, next) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                //If error send Forbidden (403)
                res.status(403).json({message:"Forbidden"});
                return null;
            } else {
                next(decoded);
            }
        })
    }
}