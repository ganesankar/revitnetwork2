require("dotenv").config();
require('rootpath')();
const ejs = require('ejs');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookierParser = require("cookie-parser");
const path = require("path");

//ROUTES
const studentdb = require("./routes/api/studentsdb");
const staffdb = require("./routes/api/staffdb");
const profiledb = require("./routes/api/profiledb");
const usersdb = require("./routes/api/usersdb");


//ROUTES
require("./models/usermodel");

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, findOneAndUpdate: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// EXPRESS & PORT CONFIG
// ==============================================
const app = express();
const appAdmin = express();
appAdmin.engine('html', ejs.renderFile);
appAdmin.set('view engine', 'html');
appAdmin.set('views', __dirname + '/login');
appAdmin.use(express.static(path.join(__dirname, 'login')));
appAdmin.use((req, res, next) => {
    return res.sendFile(path.resolve( __dirname, 'login' , 'index.html'));
  });
// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// API ROUTES
app.use("/api", studentdb);
app.use("/api", staffdb);
app.use('/adminlogin', appAdmin);
// EXPRESS MIDDLWARE
app.use(cookierParser());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// AUTH ROUTES
app.use("/auth", usersdb);
app.use("/auth", profiledb);

//PASSPORT CONFIG
require("./config/passport")(passport);
// require("./config/passportGoogle")(passport);

// Serve Static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set client/build folder
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// START THE SERVER
// =============================================
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
