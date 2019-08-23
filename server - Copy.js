require("dotenv").config();
require('rootpath')();
const ejs = require('ejs');
const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookierParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

//ROUTES
const citydb = require("./routes/api/citydb");
const studentdb = require("./routes/api/studentsdb");
const itinerarydb = require("./routes/api/itinerarydb");
const activitydb = require("./routes/api/activitydb");
const commentdb = require("./routes/api/commentdb");
const cmsdb = require("./routes/api/cmsdb");
const profiledb = require("./routes/api/profiledb");
const usersdb = require("./routes/api/usersdb");

//ROUTES

const login = require("./routes/login");
require("./models/usermodel");

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================
const app = express();
const appAdmin = express();
var router = express.Router();
appAdmin.use(express.static(path.join(__dirname, 'login')));


appAdmin.engine('html', ejs.renderFile);
appAdmin.set('view engine', 'html');
appAdmin.set('views', __dirname + '/login');
appAdmin.use((req, res, next) => {
    return res.sendFile(path.resolve( __dirname, 'login' , 'index.html'));
  });
const User = require("./models/usermodel");
router.post('/', function(request, response) {
	console.log('fucked not');
	console.log(request);
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		///////////
		User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
		console.log('fucked not');
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
		  console.log('fucked not');
        // User Matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
          // favorites: user.favoritesuser.favorites
        };
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
		console.log('fucked');
		request.session.loggedin = true;
		request.session.username = username;
		response.redirect('/home');
        // res.json({ msg: "Email and password success" });
      } else {
		  console.log('fucked not');
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
		////////////
		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// API ROUTES
app.use("/api", citydb);
app.use("/api", studentdb);
app.use("/api", itinerarydb);
app.use("/api", activitydb);
app.use("/api", commentdb);
app.use("/api", cmsdb);
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
