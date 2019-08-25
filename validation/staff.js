const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStaff(data) {
  let errors = {};

  data.staffname = !isEmpty(data.staffname) ? data.staffname : "";
  data.anniversary = !isEmpty(data.anniversary) ? data.anniversary : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.emailid = !isEmpty(data.emailid) ? data.emailid : "";
  data.flagimg = !isEmpty(data.flagimg) ? data.flagimg : "";
  data.emailid = !isEmpty(data.emailid) ? data.emailid : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.native = !isEmpty(data.native) ? data.native : "";
  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.social = !isEmpty(data.social) ? data.social : [];
  data.semesterlist = !isEmpty(data.semesterlist) ? data.semesterlist : [];
  data.qualification = !isEmpty(data.qualification) ? data.qualification : "";
  data.experience = !isEmpty(data.experience) ? data.experience : "";
  data.specialization = !isEmpty(data.specialization) ? data.specialization : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.url = !isEmpty(data.url) ? data.url : "";
  data.work = !isEmpty(data.work) ? data.work : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.phoneno = !isEmpty(data.phoneno) ? data.phoneno : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.rollno = !isEmpty(data.rollno) ? data.rollno : "";

  if (Validator.isEmpty(data.staffname)) {
    errors.staffname = "Staff Name is required";
  }

  if (!Validator.isLength(data.staffname, { min: 2, max: 30 })) {
    errors.staffname = "Staff Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.rollno)) {
    errors.rollno = "Roll No is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
