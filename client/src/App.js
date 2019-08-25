import React, { Component } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/layout/PrivateRoute";
import store from "./store";
import { Provider } from "react-redux";

// CSS
import "./styles/App.css";
import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

// ROUTES
import Home from "./views/Home";

import Students from "./views/Students";
import Student from "./views/Student";
import StudentEdit from "./views/StudentEdit";

import Staffs from "./views/Staffs";
import Staff from "./views/Staff";
import StaffEdit from "./views/StaffEdit";

import Login from "./views/Login";
import Signup from "./views/Signup";

// JWT TOKEN
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="landing-page ">
          <div className=" wrapper">
            <Navbar />
            <div className="main-panel">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/student/:url" component={Student} />
                <PrivateRoute exact path="/student/edit/:url" component={StudentEdit} />
                <Route exact path="/staffs" component={Staffs} />
                <Route exact path="/staff/:url" component={Staff} />
                <PrivateRoute exact path="/staff/edit/:url" component={StaffEdit} />
               
                
              </Switch>
            </div>
           
          </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.protoTypes = {
  cities: PropTypes.array
};

export default App;
