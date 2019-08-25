import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import Header from "./../components/layout/Header";

import {
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function Transition(props) {
  return <div direction="up" {...props} />;
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      avatar: null,
      country: "",
      open: false,
      previewAvatar: null,
      errors: {},
      checkbox: false
    };
    this.tccheckbox = this.tccheckbox.bind(this);
  }

  // ROUTE LOGIC
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // T&C CHECKBOX LOGIC
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAgree = () => {
    this.setState(() => ({
      checkbox: true,
      open: false
    }));
  };

  tccheckbox = () => {
    this.setState(() => ({
      checkbox: true,
      open: false
    }));
  };

  // REMOVE IMAGE
  removeImage = event => {
    this.setState({
      avatar: null,
      previewAvatar: null
    });
  };

  // IMAGE METHODS
  fileChangedHandler = event => {
    this.setState({
      avatar: event.target.files[0],
      previewAvatar: URL.createObjectURL(event.target.files[0])
    });
  };

  // FORM EVENT HANDLER
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // FORM SUBMIT
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", this.state.avatar);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("password2", this.state.password2);
    formData.append("firstname", this.state.firstname);
    formData.append("lastname", this.state.lastname);
    formData.append("country", this.state.country);

    this.props.registerUser(formData, this.props.history);
  };

  render() {
    const previewAvatar = this.state.previewAvatar;
    const { errors } = this.state;

    const checkboxFalseBtn = (
      <button
        disabled={true}
        color={"primary"}
        title={"Agree to Terms & Conditions"}
        type={"submit"}
        size={"large"}
        variant={"extended"}
        value={"Submit"}
      />
    );

    const checkboxTrueBtn = (
      <button
        bgcolor={"#039be5"}
        disabled={false}
        color={"primary"}
        title={"Submit"}
        type={"submit"}
        size={"large"}
        variant={"extended"}
        value={"Submit"}
        onClick={this.onSubmit}
      />
    );

    const checkboxFalse = (
      <div>
        <Input
          type="checkbox"
          value="t&c"
          color="primary"
          name="t&c_checkbox"
          onClick={this.tccheckbox}
        />

        <span>
          I agree to MYtinerarys{" "}
          <span className="tandc" onClick={this.handleClickOpen}>
            Terms & Conditions
          </span>
        </span>
      </div>
    );

    const checkboxTrue = (
      <div>
        <Input type="checkbox" />
        <span>
          I agree to MYtinerarys{" "}
          <span className="tandc">Terms & Conditions</span>
        </span>
      </div>
    );

    //IMAGE LOGIC
    const noPreview = (
      <React.Fragment>
        <Link to="/login">
          <p className="homepageLinkText">
            *Google & Facebook Registration is Supported.
          </p>
        </Link>

        <div className="registerFormPhototext">Upload Profile Image Below:</div>
        <div className="cmsUploadimage">
          <input type="file" onChange={this.fileChangedHandler} />
        </div>
        <div>
          <p>*Gravatar is Supported.</p>
        </div>
      </React.Fragment>
    );

    const preview = (
      <React.Fragment>
        <div className="previewPhoto">
          <img
            className="previewImage"
            alt="imageuploader"
            src={this.state.previewAvatar}
          />
        </div>
        <div className="removePhotoDiv">
          <Button
            className="removePhoto"
            onClick={this.removeImage}
            variant="contained"
          >
            Remove Image
          </Button>
        </div>
      </React.Fragment>
    );

    const registerForm = (
      <React.Fragment>
        <Header title={"Register"} />
        <div className="itineraryCard">
          {/* START OF FORM */}
          <Card raised className="commentForm">
            <form
              encType="multipart/form-data"
              noValidate
              onSubmit={this.onSubmit}
            >
              {previewAvatar === null ? noPreview : preview}

              {/* START OF REST OF FORM */}
              <div>
                <Input
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Username:"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  placeholder="Username:"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  errorform={errors.username}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div>
                <Input
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Password:"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  errorform={errors.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <Input
                className="registerFormInput"
                id="outlined-with-placeholder"
                label="Confirm Password:"
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                errorform={errors.password2}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
              <div>
                <Input
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Email:"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  placeholder="Email:"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errorform={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div>
                <Input
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="First Name:"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  placeholder="First Name:"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  errorform={errors.firstname}
                />
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>
              <div>
                <Input
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Last Name:"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  placeholder="Last Name:"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  errorform={errors.lastname}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div>
                <div>
                  <FormGroup variant="filled">
                    <Label htmlFor="filled-country-simple">Country:</Label>
                    <Input
                      type="select"
                      className="selectForms"
                      value={this.state.country}
                      onChange={this.onChange}
                      errorform={errors.country}
                      name="country"
                    >
                      <option value="">
                        <em>None</em>
                      </option>
                      <option value="Spain">Spain</option>
                      <option value="UK">UK</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Ireland">Ireland</option>
                      <option value="USA">USA</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
              {errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )}

              {/* T&C CHECKBOX */}
              <div>
                {this.state.checkbox === false ? checkboxFalse : checkboxTrue}
              </div>
              {/* MODAL */}
              <div>
                <Modal
                  isOpen={this.state.open}
                  TransitionComponent={Transition}
                  keepMounted
                  toggle={this.handleClose}
                  aria-labelledby="alert-Modal-slide-title"
                  aria-describedby="alert-Modal-slide-description"
                >
                  <ModalHeader id="alert-Modal-slide-title">
                    {"MYtinerary Terms & Conditions"}
                  </ModalHeader>
                  <ModalBody>
                    Let MYtinerary help apps determine location. This means
                    sending anonymous data to MYtinerary, even when no apps are
                    running.
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={this.handleClose} color="primary">
                      Disagree
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              {/* SUBMIT BUTTON */}
              <div>
                {this.state.checkbox === false
                  ? checkboxFalseBtn
                  : checkboxTrueBtn}
              </div>
            </form>
          </Card>
        </div>
      </React.Fragment>
    );

    return <React.Fragment>{registerForm}</React.Fragment>;
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));
