import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
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
      students: []
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    console.log(this.props.students);
    /*
    let filteredstudents = this.props.students.students.filter(student => {
      return (
        student.studentname.toLowerCase().includes(this.state.query.toLowerCase()) ||
        student.nickname.toLowerCase().includes(this.state.query.toLowerCase())
      );
    });
     */
    let filteredstudents = this.props.students.students || [];
    return (
      <div>
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center">
              <Col lg="4">
                <h1 className="text-center">
                  <FontAwesomeIcon icon={faUserGraduate} />
                  Students
                </h1>

                <hr className="line-primary m-auto" />
                <Row className="row-grid justify-content-center">
                  <Col lg="6"></Col>
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
            {filteredstudents.length < 1 ? (
              <div className="paragraphText">
                There are no destinations matching your search query.
              </div>
            ) : (
              <React.Fragment>
                {filteredstudents.map(student => {
                  return (
                    <React.Fragment key={student._id}>
                      <Row>
                        {" "}
                        <Col lg="4">
                          <Card className="card-coin card-plain">
                            <div >
                              <Link
                                to={{
                                  pathname: "/student/" + student.url,
                                  state: {
                                    city: student.cityname,
                                    country: student.country,
                                    url: student.flagimg
                                  }
                                }}
                                className="citylist "
                              >
                                <div className="icon icon-primary">
                                  {student.flagimg ? (
                                    <img alt="cmsImage" className="img-center img-fluid  rounded-circle" src={student.flagimg} />
                                    
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faUserGraduate}
                                      size="4x"
                                      className={`text-default`}
                                    />
                                  )}
                                </div>
                                <h4 className="info-title">
                                  {student.studentname}
                                </h4>
                              </Link>
                              <hr className="line-primary" />
                              <p>
                                {student.emailid} <br />
                                {student.location}
                                <br />
                                {student.nickname}
                              </p>
                            </div>
                            <CardFooter className="text-center">
                              <NavLink
                                to={{
                                  pathname: "/student/edit/" + student.url
                                }}
                              >
                                <Button className="btn-simple" color="primary">
                                  VIEW ALL
                                </Button>
                              </NavLink>
                              <NavLink
                                to={{
                                  pathname: "/student/edit/" + student.url
                                }}
                              >
                                <Button className="btn-simple" color="success">
                                  VIEW ALL
                                </Button>
                              </NavLink>
                            </CardFooter>
                          </Card>
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

        {/* students */}
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    favid: state.favid,
    profile: state.profile
  };
};

Students.propTypes = {
  students: PropTypes.object,
  fetchStudents: PropTypes.func,
  getCurrentProfile: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStudents, getCurrentProfile }
)(Students);
