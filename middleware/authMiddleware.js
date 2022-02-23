const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

router.all('*', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    let token = req.headers.authorization;//.split(' ')[1];
    if(token == null){
      return res.status(401).json({status: false, msg: 'Unauthrized'});
    }
    console.log(user._id);
    token = req.headers.authorization.split(' ')[1];
    if (err || !user) {
      return res.status(401).json({status: false, msg: 'Unauthrized'});
    } else {
      return next();
    }
  })(req, res, next);
});

module.exports = router;
// const jwt = require("jsonwebtoken");

// const config = process.env;

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).json({status : false, msg : "A token is required for authentication", err : {}});
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).json({status : false, msg : "Invalid token", err : {}});
//   }
//   return next();
// };

// module.exports = verifyToken;