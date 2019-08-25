import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { renderSocial, renderHttp } from "../actions/utils/general";
import LoadAnimate from "../components/common/LoadAnimate";
import {
  
  faMapMarkerAlt,
  faBirthdayCake,
  faGlassCheers,
  faBriefcase,
  faBaby,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import {
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

import NotFound from "../components/errors/NotFound";

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
  renderSwitch(param) {
    const newRet =
      "facebook-f " + param.charAt(0).toUpperCase() + param.slice(1);
    const ret = `fab fa-` + newRet;
    return ret;
  }

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    const userIcon =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yMi40MTcsMTQuODM2Yy0xLjIwOSwyLjc2My0zLjg0Niw1LjA3NC02LjQwMyw1LjA3NGMtMy4xMjIsMC01LjM5LTIuMjg0LTYuNTk5LTUuMDQ2ICAgYy03LjAzMSwzLjY0Mi02LjE0NSwxMi44NTktNi4xNDUsMTIuODU5YzAsMS4yNjIsMC45OTQsMS40NDUsMi4xNjIsMS40NDVoMTAuNTgxaDEwLjU2NWMxLjE3LDAsMi4xNjctMC4xODQsMi4xNjctMS40NDUgICBDMjguNzQ2LDI3LjcyMywyOS40NDcsMTguNDc5LDIyLjQxNywxNC44MzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTE2LjAxMywxOC40MTJjMy41MjEsMCw2LjMyLTUuMDQsNi4zMi05LjIwNGMwLTQuMTY1LTIuODU0LTcuNTQxLTYuMzc1LTcuNTQxICAgYy0zLjUyMSwwLTYuMzc2LDMuMzc2LTYuMzc2LDcuNTQxQzkuNTgyLDEzLjM3MywxMi40OTEsMTguNDEyLDE2LjAxMywxOC40MTJ6IiBmaWxsPSIjNTE1MTUxIi8+PC9nPjwvc3ZnPg==";

    const { student, getStudentLoading } = this.props.students;
    const studentOne = student[0] || {};
    let socialAcc = [];
    if (Object.keys(studentOne).length > 0 && studentOne.social.length > 0) {
      socialAcc = JSON.parse(studentOne.social);
    }
    console.log(socialAcc);
    return (
      <div className="profile-page pt-5">
        {getStudentLoading &&  <LoadAnimate position="absolute"> </LoadAnimate> }
        {!getStudentLoading && Object.keys(studentOne).length === 0 ? (
          <NotFound status="400" />
        ) : (
          <Container className="align-items-center pt-5">
            <Row>
              <Col lg="6" md="6">
              <h5 className="text-on-back">{studentOne.rollno}</h5>
                <h1 className="profile-title text-left"> {studentOne.studentname}
                </h1>
                <h4 className="text-on-back-sm">{studentOne.sprno}</h4>
                <p className="profile-description">{studentOne.sprno}</p>
                <div className="btn-wrapper profile pt-3">
                  {socialAcc.length > 0 &&
                    socialAcc.map(sociallink => {
                      return (
                        <React.Fragment key={sociallink.id}>
                          {sociallink.value && (
                            <a
                              rel="noopener noreferrer"
                              color={sociallink.name}
                              href={renderHttp(sociallink.value)}
                              target="_blank"
                              className="btn btn-icon btn-round"
                            >
                              <i class={renderSocial(sociallink.name)}></i>
                            </a>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="cmsImage"
                      className="img-center img-fluid  rounded-circle"
                      src={studentOne.flagimg ? studentOne.flagimg : userIcon}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">
                          {studentOne.nickname}
                        </h4>
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
                            <FontAwesomeIcon icon={faBaby} />{" "}
                            {studentOne.native}
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
        )}
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
