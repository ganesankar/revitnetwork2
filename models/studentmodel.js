const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentname: {
    type: String
  },
  sprno: {
    type: Number
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
  url: {
    type: String
  },
  flagimg: {
    type: String
  }
});

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;
