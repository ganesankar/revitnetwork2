const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  staffname: {
    type: String
  },
  qualification: {
    type: String
  },
  experience: {
    type: String
  },
  specialization: {
    type: String
  },
  emailid: {
    type: String
  },
  nickname: {
    type: String
  },
  dob: {
    type: String
  },
  anniversary: {
    type: String
  },
  status: {
    type: String
  },
  native: {
    type: String
  },
  location: {
    type: String
  },
  work: {
    type: String
  },
  title: {
    type: String
  },
  social: {
    type: String
  },
  semesterlist: {
    type: String
  },
  subjects: {
    type: String
  },
  url: {
    type: String
  },
  flagimg: {
    type: String
  },
  rollno: {
    type: String
  },
  description: {
    type: String
  },
  phoneno: {
    type: String
  }
});

const Staff = mongoose.model("staffs", StaffSchema);
module.exports = Staff;
