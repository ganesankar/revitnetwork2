import React, { Component } from "react";
import PropTypes from "prop-types";
// reactstrap components
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import { connect } from "react-redux";
import {
  loginUser,
  registerUser,
  socialRegisterUser
} from "../actions/authActions";
import { GoogleLogin } from "react-google-login";
import { googleClientID } from "./../keys.js";

import { GoogleLoginButton } from "react-social-login-buttons";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      avatar: "",
      firstname: "",
      lastname: "",
      errors: {},
      isAuthenticated: false,
      user: null,
      token: ""
      // loginError: false,
      // redirect: false
    };
  }

  // RE-ENABLE PUSH (REDIRECT)
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // LOGOUT

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: "",
      user: null,
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    });
  };

  onFailure = error => {
    alert(error);
  };

  componentClicked = () => console.log("clicked");

  // SUBMIT

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };

    this.props.loginUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    const responseGoogle = response => {
      let googleData;
      googleData = {
        googleID: response.profileObj.googleId,
        email: response.profileObj.email,
        password: "",
        username: response.profileObj.name,
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        avatar: response.profileObj.imageUrl,
        accesstoken: response.accessToken
      };
      this.props.socialRegisterUser(googleData);
    };

    const loginComponent = (
      <React.Fragment>
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <Card className="card-register">
                    <CardHeader>
                      <CardTitle tag="h4" className="text-white">
                        Login
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={this.onSubmit}>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": this.state.emailFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            errorform={errors.email}
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": this.state.passwordFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            errorform={errors.password}
                            onFocus={e =>
                              this.setState({ passwordFocus: true })
                            }
                            onBlur={e =>
                              this.setState({ passwordFocus: false })
                            }
                          />
                          {errors.password && (
                            <div>
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                              <div className="removePhotoDiv" />
                            </div>
                          )}
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="btn-round"
                        color="primary"
                        size="lg"
                      >
                        Get Started
                      </Button>

                      <GoogleLogin
                        clientId={googleClientID}
                        render={renderProps => (
                          <GoogleLoginButton
                            className="btn-round"
                            alt="googleLogo"
                            onClick={renderProps.onClick}
                            align={"center"}
                          >
                            <span>Google</span>
                          </GoogleLoginButton>
                        )}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className="btn-round"
                        theme="dark"
                      />
                      <p>
                        {" "}
                        Currently Registration and login is disbaled, Please use
                        google login{" "}
                      </p>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
    const noAccountMessage = (
      <div>
        <p className="createAccountText">
          {" "}
          {/*
            <Link to="/Signup">
            <span className="createAccountLink">Create an account!</span>
          </Link>{" "}
           */}
        </p>
      </div>
    );
    return (
      <div>
        {loginComponent}
        {noAccountMessage}
        <div />
      </div>
    );
  }
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, socialRegisterUser }
)(Login);
