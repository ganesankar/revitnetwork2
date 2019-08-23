const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// const passport = require("passport");
const multer = require("multer");


router.get('/', function (req, res) {
    // log user out
    

    
    res.render('login/index');
});

;
// EXPORT
module.exports = router;
