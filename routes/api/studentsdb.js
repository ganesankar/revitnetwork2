const express = require("express");
const router = express.Router();
const Studentmodel = require("../../models/studentmodel");

//GET
// @route api/student
// @desc GET Student Info
// @access Public

router.get("/student", (req, res) => {
  Studentmodel.find().then(student => res.json(student));
});

//POST
// @route  api/student
// @desc POST Student Info (No Image)
// @access Public

router.post("/student", (req, res) => {
  const student = new Studentmodel({
    studentname: req.body.studentname,
    sprno: req.body.sprno,
    emailid: req.body.emailid,
    nickname: req.body.nickname,
    dob: req.body.dob,
    anniversary: req.body.anniversary,
    status: req.body.status,
    native: req.body.native,
    location: req.body.location,
    work: req.body.work,
    title: req.body.title,
    social: req.body.social,
    url: req.body.url,
    id: req.body.id
  });
  student
    .save()
    .then(doc => {
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
