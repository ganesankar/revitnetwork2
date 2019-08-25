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
  Studentmodel.find()
    .then(student => res.json(student))
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

router.get("/student/:url", (req, res) => {
  Studentmodel.find({ _id: req.params.url })
    .then(student => res.json(student))
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});
//POST
// @route  api/student
// @desc POST Student Info (No Image)
// @access Public

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post("/student/:id", upload.any(), (req, res, next) => {
  console.log("student post");
  const { errors, isValid } = validateStudent(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const imagenotupdated = req.body.flagimg;
  const flagimg =
    req.body.flagimg === null || req.body.flagimg === undefined
      ? "/uploads/students/" + req.files[0].filename
      : imagenotupdated;

  const cmsfields = {};
  cmsfields.studentname = req.body.studentname;
  cmsfields.sprno = req.body.sprno;
  cmsfields.emailid = req.body.emailid;
  cmsfields.nickname = req.body.nickname;
  cmsfields.dob = req.body.dob;
  cmsfields.anniversary = req.body.anniversary;
  cmsfields.status = req.body.status;
  cmsfields.native = req.body.native;
  cmsfields.location = req.body.location;
  cmsfields.work = req.body.work;
  cmsfields.title = req.body.title;
  cmsfields.social = req.body.social;
  cmsfields.url = req.body.url;
  cmsfields.flagimg = flagimg;

  Studentmodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  )
    .then(() => {
      res.status(201).json({
        message: "Student Profile Updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/student", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateStudent(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const imagenotupdated = req.body.flagimg;
  const flagimg =
    req.body.flagimg === null || req.body.flagimg === undefined
      ? "/uploads/students/" + req.files[0].filename
      : imagenotupdated;
  const newstudent = new Studentmodel({
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
    flagimg: flagimg
  });

  newstudent
    .save()
    .then(() => {
      res.status(201).json({
        message: newstudent
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
