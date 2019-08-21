import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profileActions";

import { Spring } from "react-spring/renderprops";

import CustomButton from "./../components/layout/CustomButton";

class Home extends Component {
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
                <Col md="3">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">STUDENTS</h4>
                          <hr className="line-primary" />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                    <NavLink to="/dashboard">
                    <Button className="btn-simple" color="primary">
                        VIEW ALL
                      </Button>
              </NavLink>
                      
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                    
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">STAFFS</h4>
                          <hr className="line-success" />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                    <NavLink to="/staffs">
                    <Button className="btn-simple" color="success">
                        VIEW ALL
                      </Button>
              </NavLink>
                      
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                     
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">EVENTS </h4>
                          <hr className="line-info" />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                    <NavLink to="/events">
                      <Button className="btn-simple" color="info">
                        VIEW ALL
                      </Button>   </NavLink>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                     
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">EVENTS </h4>
                          <hr className="line-info" />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                    <NavLink to="/links">
                      <Button className="btn-simple" color="warning">
                        VIEW ALL
                      </Button>   </NavLink>
                    </CardFooter>
                  </Card>
                </Col>
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
              src={require("../images/revit.png")} />
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
                      </Button>   </NavLink>
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
         
          

        <div className="page-header">
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
