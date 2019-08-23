import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faChalkboardTeacher, faCalendar, faLink} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profileActions";

import { Spring } from "react-spring/renderprops";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeUserMenu: [
        {
          id: 1,
          name: "Students",
          icon: faUserGraduate,
          url: "/students",
          color: "primary",
          desc: ""
        },
        {
          id: 2,
          name: "Staffs",
          icon: faChalkboardTeacher,
          url: "/staffs",
          color: "success",
          desc: ""
        },
        {
          id: 3,
          name: "Events",
          icon: faCalendar,
          url: "/calendar",
          color: "info",
          desc: ""
        },
        {
          id: 4,
          name: "Others",
          icon: faLink,
          url: "/others",
          color: "warning",
          desc: ""
        }
      ]
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const loginState = (
      <React.Fragment>
        <Container>
          <Row>
            {this.state.homeUserMenu.map(menu => (
              <Col md="3">
                <Card className="card">
                  <CardHeader>
                  <FontAwesomeIcon icon={menu.icon} size="4x" className={`text-${menu.color}`}/>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">{menu.name}</h4>
                        <hr className="line-primary" />
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <NavLink to={menu.url}>
                      <Button className="btn-simple" color={menu.color}>
                        VIEW ALL
                      </Button>
                    </NavLink>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </React.Fragment>
    );
    const logoutState = (
      <React.Fragment>
        <Container>
          <Row>
            <Col md="4">
              <Card className="card-coin card-plain">
                <CardHeader>
                  <img
                    className="img-center img-fluid"
                    alt=""
                    src={require("../images/revit.png")}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="text-center" md="12">
                      <h4 className="text-uppercase">WELCOME BUDDY</h4>
                      <hr className="line-primary" />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <NavLink to="/login">
                    <Button className="btn-simple" color="info">
                      LOGIN
                    </Button>{" "}
                  </NavLink>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );

    const homepageBody = (
      <div>
        <div>
          <div className="page-header ">
            <Container>
              <div className="text-center brand">
                <h1 className="h1-seo"> REVIT 08</h1>
                <h3 className="d-none d-sm-block">
                  JJCET 2008 IT BATCH STUDENTS COMMUNITY
                </h3>
                {isAuthenticated ? loginState : logoutState}
              </div>
            </Container>
          </div>

          {/* TERNERY AUTH LOGIC */}
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {/* ANIMATION TERNERY AUTH LOGIC */}
        {isAuthenticated ? (
          <div>
            {" "}
            <Spring
              from={{ opacity: 0, marginTop: -500 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ delay: 0, duration: 500 }}
            >
              {props => <div style={props}>{homepageBody}</div>}
            </Spring>
          </div>
        ) : (
          <div>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 500 }}
            >
              {props => <div style={props}>{homepageBody}</div>}
            </Spring>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentProfile }
)(Home);
