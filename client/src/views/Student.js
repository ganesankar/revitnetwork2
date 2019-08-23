import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../actions/profileActions";
import { connect } from "react-redux";
import { fetchStudents } from "../actions/studentsActions";

import Header from "../components/layout/Header";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.cities,
      city: "",
      country: ""
    };
  }
  componentDidMount() {
     this.props.fetchStudents();
    if (this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
  }
  render() {
    let showStudent = (
      <React.Fragment>
        {/* <img src={this.props.location.state.url} /> */}
        <span>
          {this.props.location.state.city}, {this.props.location.state.country}
        </span>
      </React.Fragment>
    );

    return (
      <div>
        <div>
          <Header title={showStudent} />
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.city_name;
  return {
    city: state.cities.cities.find(city => city.id === id),
    cities: state.cities,
    profile: state.profile,
    auth: state.auth
  };
};

Student.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  {
    fetchItinerariesByStudent,
    fetchStudents,
    getCurrentProfile
  }
)(Student);
