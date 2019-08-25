const express = require("express");
const router = express.Router();
const Staffmodel = require("../../models/staffmodel");
const multer = require("multer");

//VALIDATION
const validateStaff = require("../../validation/staff");
//MULTER SETUP
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/staffs/");
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
// @route api/staff
// @desc GET Staff Info
// @access Public

router.get("/staff", (req, res) => {
  Staffmodel.find()
    .then(staff => res.json(staff))
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

router.get("/staff/:url", (req, res) => {
  Staffmodel.find({ _id: req.params.url })
    .then(staff => res.json(staff))
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});
//POST
// @route  api/staff
// @desc POST Staff Info (No Image)
// @access Public

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post("/staff/:id", upload.any(), (req, res, next) => {
  console.log("staff post");
  const { errors, isValid } = validateStaff(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const imagenotupdated = req.body.flagimg;
  const flagimg =
    req.body.flagimg === null || req.body.flagimg === undefined
      ? "/uploads/staffs/" + req.files[0].filename
      : imagenotupdated;

  const cmsfields = {};
  cmsfields.staffname = req.body.staffname;
  cmsfields.qualification = req.body.qualification;
  cmsfields.experience = req.body.experience;
  cmsfields.specialization = req.body.specialization;
  cmsfields.rollno = req.body.rollno;
  cmsfields.description = req.body.description;
  cmsfields.phoneno = req.body.phoneno;
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
  cmsfields.semesterlist = req.body.semesterlist;
  
  cmsfields.url = req.body.url;
  cmsfields.flagimg = flagimg;

  Staffmodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  )
    .then(() => {
      res.status(201).json({
        message: "Staff Profile Updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/staff", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateStaff(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const imagenotupdated = req.body.flagimg;
  const flagimg =
    req.body.flagimg === null || req.body.flagimg === undefined
      ? "/uploads/staffs/" + req.files[0].filename
      : imagenotupdated;
  const newstaff = new Staffmodel({
    staffname: req.body.staffname,
    qualification: req.body.qualification,
	experience: req.body.experience,
	specialization: req.body.specialization,
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
	semesterlist: req.body.semesterlist,
    url: req.body.url,
    rollno: req.body.rollno,
    description: req.body.description,
    phoneno: req.body.phoneno,
    flagimg: flagimg
  });

  newstaff
    .save()
    .then(() => {
      res.status(201).json({
        message: newstaff
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
