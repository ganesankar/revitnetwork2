import React, { Component } from "react";
import {
  Card,
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  Media
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faCalendar,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStudents } from "../actions/studentsActions";
import { getCurrentProfile } from "./../actions/profileActions";
import { debounce } from "lodash";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: "",
      country: "",
      query: "",
      error: null,
      text: "",

      // filteredCities: []
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    let filteredCities = this.props.cities.cities.filter(city => {
      return (
        city.cityname.toLowerCase().includes(this.state.query.toLowerCase()) ||
        city.country.toLowerCase().includes(this.state.query.toLowerCase())
      );
    });

    return (
      <div>
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">
                  <FontAwesomeIcon icon={faUserGraduate}  />
                  Students
                </h1>

                <hr className="line-primary" />
                <Row className="row-grid justify-content-center">
                  <Col lg="6">
                    
                  </Col>
                  <Col lg="6">
                    {" "}
                    <Input
                      id="filled-with-placeholder"
                      label="Search Destinations"
                      type="text"
                      placeholder="Type to Search "
                      onChange={e => this.handleSearch(e.target.value)}
                      margin="normal"
                      className="cityfilter"
                      variant="outlined"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {filteredCities.length < 1 ? (
              <div className="paragraphText">
                There are no destinations matching your search query.
              </div>
            ) : (
              <React.Fragment>
                {filteredCities.map(city => {
                  return (
                    <React.Fragment key={city._id}>
                      <Row>
                        {" "}
                        <Col lg="12">
                          <Link
                            to={{
                              pathname: "/student/" + city.url,
                              state: {
                                city: city.cityname,
                                country: city.country,
                                url: city.flagimg
                              }
                            }}
                            className="citylist"
                          >
                            <Card>
                              <Media>
                                <Media left href="#">
                                  <Media
                                    object
                                    data-src={require("../images/revit.png")}
                                    alt="Generic placeholder image"
                                  />
                                </Media>
                                <Media body>
                                  <Media heading>{city.cityname}</Media>
                                  {city.country}
                                </Media>
                              </Media>
                            </Card>
                          </Link>
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            )}
          </Container>
        </section>
        <div className="citysearchflex"></div>

        {/* CITIES */}
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    favid: state.favid,
    profile: state.profile
  };
};

Students.propTypes = {
  cities: PropTypes.object,
  fetchStudents: PropTypes.func,
  getCurrentProfile: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStudents, getCurrentProfile }
)(Students);
