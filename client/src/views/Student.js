import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faMapMarkerAlt,
  faBirthdayCake,
  faGlassCheers,
  faBriefcase,
  faBaby,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import {
  Media,
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { fetchStudent } from "../actions/studentsActions";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      tabs: 1
    };
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.url);
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    const { student } = this.props.students;
    const studentOne = student[0] || {};
    return (
      <div className="profile-page pt-5">
        <Container className="align-items-center pt-5">
          <Row>
            <Col lg="6" md="6">
              <h1 className="profile-title text-left">
                {" "}
                {studentOne.studentname}
              </h1>
              <h5 className="text-on-back">{studentOne.sprno}</h5>
              <p className="profile-description">{studentOne.sprno}</p>
              <div className="btn-wrapper profile pt-3">
                {studentOne.social &&
                  studentOne.social.length > 0 &&
                  studentOne.social.map(sociallink => {
                    return (
                      <React.Fragment key={sociallink.id}>
                        <Button
                          className="btn-icon btn-round"
                          color={sociallink.name}
                          href={sociallink.url}
                          target="_blank"
                        >
                          {" "}
                          <i className={sociallink.icon} />
                        </Button>
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Card className="card-coin card-plain">
                <CardHeader>
                  {student.flagimg ? (
                    <Media
                      object
                      data-src={student.flagimg}
                      alt="Generic placeholder image"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      size="4x"
                      className={`text-default`}
                    />
                  )}
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="text-center" md="12">
                      <h4 className="text-uppercase">{studentOne.nickname}</h4>
                      <span>INFO</span>
                      <hr className="line-success" />
                    </Col>
                  </Row>
                  <Row>
                    <ListGroup>
                      {studentOne.dob && (
                        <ListGroupItem>
                          {" "}
                          <FontAwesomeIcon icon={faBirthdayCake} />{" "}
                          {studentOne.dob}
                        </ListGroupItem>
                      )}
                      {studentOne.anniversary && (
                        <ListGroupItem>
                          <FontAwesomeIcon icon={faGlassCheers} />{" "}
                          {studentOne.anniversary}
                        </ListGroupItem>
                      )}
                      {studentOne.emailid && (
                        <ListGroupItem>
                          <FontAwesomeIcon icon={faEnvelope} />{" "}
                          {studentOne.emailid}
                        </ListGroupItem>
                      )}
                      {studentOne.location && (
                        <ListGroupItem>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                          {studentOne.location}
                        </ListGroupItem>
                      )}
                      {studentOne.native && (
                        <ListGroupItem>
                          <FontAwesomeIcon icon={faBaby} /> {studentOne.native}
                        </ListGroupItem>
                      )}
                      {studentOne.work && (
                        <ListGroupItem>
                          <FontAwesomeIcon icon={faBriefcase} />{" "}
                          {studentOne.work}
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.students
  };
};

Student.propTypes = {
  students: PropTypes.object
};

export default connect(
  mapStateToProps,
  { fetchStudent }
)(Student);
