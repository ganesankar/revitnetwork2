const express = require("express");
const router = express.Router();
const Studentmodel = require("../../models/studentmodel");
const multer = require("multer");

//VALIDATION
const validateStudent = require("../../validation/student");
//MULTER SETUP
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/students/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("no accepted file"), false);
  }
};
//GET
// @route api/student
// @desc GET Student Info
// @access Public

router.get("/student", (req, res) => {
  Studentmodel.find().then(student => res.json(student));
});

router.get("/student/:url", (req, res) => {
  Studentmodel.find({ url: req.params.url }).then(student => res.json(student));
});
//POST
// @route  api/student
// @desc POST Student Info (No Image)
// @access Public

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post("/student", upload.any(), (req, res, next) => {
  
  console.log('student posr');console.log(req.body);
  const { errors, isValid } = validateStudent(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const dbid = req.body._id || "";
  const flagimg = "/uploads/" + req.files[0].filename;
  const city = new Studentmodel({
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
    id: req.body.id,
    flagimg: flagimg
  });
  if (dbid) {
    Studentmodel.findOneAndUpdate(
      { _id: dbid },
      
      { $set: city },
      { new: true }
    ).then(city => res.json(city));
  } else {
    city
      .save()
      .then(() => {
        res.status(201).json({
          message: "Created City successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});
module.exports = router;
