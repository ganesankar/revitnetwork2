import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { fetchStaff, updateStaff } from "../actions/staffsActions";
import { socialNetList, semesterList } from "../actions/utils/general";
import BreadCrumbGen from "../components/common/BreadCrumbGen";
import LoadAnimate from "../components/common/LoadAnimate";
import { ToastsContainer, ToastsStore } from "react-toasts";

import {
  Button,
  Card,
  Input,
  Label,
  Container,
  CardSubtitle,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

let staffActiveUpdate = false;
const sociallist = socialNetList();
const semesterlist = semesterList();

class StaffEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bread: [
        { name: "Staffs", link: "/staffs" },
        { name: "Create / Edit Staff", link: "" }
      ],
      showlist: false,
      query: "",
      error: null,
      text: "",
      //EDIT
      staffs: [],
      social: sociallist.slice(0),
      semesterlist: semesterlist.slice(0),
      staffname: "",
      qualification: "",
      experience: "",
      specialization: "",
      rollno: "",
      emailid: "",
      nickname: "",
      description: "",
      dob: "",
      anniversary: "",
      status: "",
      native: "",
      location: "",
      work: "",
      title: "",
      flagimg: null,
      previewFile: null,
      url: "",
      authorid: "",
      id: ""
    };
  }
  componentDidMount() {
    if (this.props.match.params.url !== "new") {
      this.props.fetchStaff(this.props.match.params.url);
      this.setState({
        staffs: this.props.staffs.staffs
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      let selectedValue = nextProps.staffs.staff[0] || {};

      if (Object.keys(selectedValue).length > 0) {
        this.setState({
          id: selectedValue._id,
          staffname: selectedValue.staffname,
          qualification: selectedValue.qualification,
          experience: selectedValue.experience,
          specialization: selectedValue.specialization,

          rollno: selectedValue.rollno,
          emailid: selectedValue.emailid,
          phoneno: selectedValue.phoneno,
          nickname: selectedValue.nickname,
          description: selectedValue.description,
          dob: selectedValue.dob,
          anniversary: selectedValue.anniversary,
          status: selectedValue.status,
          native: selectedValue.native,
          location: selectedValue.location,
          work: selectedValue.work,
          title: selectedValue.title,
          url: selectedValue.url,
          flagimg: selectedValue.flagimg,
          previewFile: selectedValue.flagimg,
          authorid: selectedValue.authorid,
          showlist: false
        });
        let dbSocial = sociallist.slice(0);
        let dbSemester = semesterlist.slice(0);

        if (selectedValue.social && selectedValue.social.length > 0) {
          dbSocial = JSON.parse(selectedValue.social);
        }
        if (
          selectedValue.semesterlist &&
          selectedValue.semesterlist.length > 0
        ) {
          dbSemester = JSON.parse(selectedValue.semesterlist);
        }
        this.setState({
          social: dbSocial,
          semesterlist: dbSemester
        });
      }
    }
  }
  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  // IMAGE INFO
  fileChangedHandler = event => {
    this.setState({
      flagimg: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  // SUBMIT
  onSubmit = e => {
    staffActiveUpdate = true;
    e.preventDefault();
    const formData = new FormData();
    formData.append("staffname", this.state.staffname);
    formData.append("qualification", this.state.qualification);
    formData.append("experience", this.state.experience);
    formData.append("specialization", this.state.specialization);
    formData.append("rollno", this.state.rollno);
    formData.append("flagimg", this.state.flagimg);
    formData.append("emailid", this.state.emailid);
    formData.append("phoneno", this.state.phoneno);
    formData.append("nickname", this.state.nickname);
    formData.append("description", this.state.description);
    formData.append("dob", this.state.dob);
    formData.append("anniversary", this.state.anniversary);
    formData.append("status", this.state.status);
    formData.append("native", this.state.native);
    formData.append("location", this.state.location);
    formData.append("work", this.state.work);
    formData.append("title", this.state.title);
    formData.append("url", this.state.url);
    formData.append("id", this.state.id);
    formData.append("social", JSON.stringify(this.state.social));
    formData.append("semesterlist", JSON.stringify(this.state.semesterlist));
    this.props.updateStaff(this.state.id, formData);
    this.props.fetchStaff(this.props.match.params.url);
  };

  // DELETE BUTTON
  onDelete = () => {
    let data = {
      id: this.state.id
    };
    this.props.deleteCity(data.id);
    this.props.history.push("/cmscity");
  };

  // FORM INFO
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //CONVERT TO SNAKE CASE
  onSnakecase = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSocialChange = e => {
    const { social } = this.state;
    const thisIndex = social.findIndex(item => item.name === e.target.name);
    if (thisIndex >= 0) {
      social[thisIndex].value = e.target.value;
    }
    this.setState({ social });
  };
  onSemesterChange = e => {
    const { semesterlist } = this.state;
    const thisIndex = semesterlist.findIndex(
      item => item.name === e.target.name
    );
    if (thisIndex >= 0) {
      semesterlist[thisIndex].value = e.target.value;
    }
    this.setState({ semesterlist });
  };

  render() {
    const {
      getStaffsLoading,
      staffUpdateSuccess,
      staffUpdateError
    } = this.props.staffs;
    if (staffUpdateSuccess && staffActiveUpdate) {
      ToastsStore.success("Changes Saved Successfully!");
      staffActiveUpdate = false;
    }
    if (staffUpdateError && staffActiveUpdate) {
      ToastsStore.error("Not able to save Changes");
      staffActiveUpdate = false;
    }
    const previewFile = this.state.previewFile;
    const deleteButton = (
      <React.Fragment>
        <div className="deleteButton">
          <Button onClick={this.onDelete} variant="outlined" color="secondary">
            Delete City
          </Button>
          <br />
        </div>
      </React.Fragment>
    );

    const cmsbody = (
      <React.Fragment>
        <div className="itineraryCard text-left">
          <form
            encType="multipart/form-data"
            noValidate
            onSubmit={this.onSubmit}
          >
            <Container fluid>
              <Row>
                <Col>
                  <h4 className="pt-1"> Info</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="staffname">Name</Label>
                    <Input
                      label="Please enter Name:"
                      placeholder="Name"
                      type="text"
                      name="staffname"
                      value={this.state.staffname}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nickname">Other Name</Label>
                    <Input
                      label="Please enter Nick Name:"
                      placeholder="Other Name"
                      type="text"
                      name="nickname"
                      value={this.state.nickname}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="rollno">Roll No</Label>
                    <Input
                      label="Please enter Roll No:"
                      placeholder="Roll No"
                      type="text"
                      name="rollno"
                      value={this.state.rollno}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="qualification">Qualification </Label>
                    <Input
                      label="Please enter Qualification:"
                      placeholder="Qualification"
                      type="text"
                      name="qualification"
                      value={this.state.qualification}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="rollno">Experience</Label>
                    <Input
                      label="Please enter Experience"
                      placeholder="Experience"
                      type="text"
                      name="experience"
                      value={this.state.experience}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="specialization">Specialization</Label>
                    <Input
                      label="Please enter Specialization"
                      placeholder="Specialization"
                      type="text"
                      name="specialization"
                      value={this.state.specialization}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className="pt-1">Contact Info</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="emailid">Email</Label>
                    <Input
                      label="Please enter Email:"
                      placeholder="Email"
                      type="text"
                      name="emailid"
                      value={this.state.emailid}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="phoneno">Phone No</Label>
                    <Input
                      label="Please enter Phone No:"
                      placeholder="Phone No"
                      type="text"
                      name="phoneno"
                      value={this.state.phoneno}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className="pt-1">Personal Info</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Date of Birth</Label>

                    <Input
                      label="Please enter Date of Birth:"
                      placeholder="Date of Birth"
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Anniversary</Label>
                    <Input
                      label="Please enter Anniversary:"
                      placeholder="Anniversary"
                      type="text"
                      name="anniversary"
                      value={this.state.anniversary}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      label="Please enter description:"
                      placeholder="description"
                      type="textarea"
                      name="description"
                      value={this.state.description}
                      onChange={this.onSnakecase}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className="pt-1">Work and Location</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="location">Current Location</Label>
                    <Input
                      label="Please enter Current Location:"
                      placeholder="Current Location"
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Native</Label>
                    <Input
                      label="Please enter Native:"
                      placeholder="Native"
                      type="text"
                      name="native"
                      value={this.state.native}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="work">Work </Label>
                    <Input
                      label="Please enter Work:"
                      placeholder="Work"
                      type="text"
                      name="work"
                      value={this.state.work}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="work">Designation</Label>
                    <Input
                      label="Please enter Designation:"
                      placeholder="Designation"
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className="pt-1">Subjects Handled By Semester</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                {this.state.semesterlist.map(semester => {
                  return (
                    <React.Fragment key={semester.id}>
                      <Col lg="6">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>{semester.name} </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name={semester.name}
                            value={semester.value}
                            onChange={this.onSemesterChange}
                          />
                        </InputGroup>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
              <Row>
                <Col>
                  <h4 className="pt-1">Social</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                {this.state.social.map(socialItem => {
                  return (
                    <React.Fragment key={socialItem.id}>
                      <Col lg="6">
                        <FormGroup>
                          <Label for="location"> {socialItem.title}</Label>
                          <Input
                            type="text"
                            name={socialItem.name}
                            value={socialItem.value}
                            onChange={this.onSocialChange}
                          />
                        </FormGroup>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>

              <Row>
                <Col></Col>
                <Col></Col>
              </Row>
            </Container>
          </form>

          {/* SUBMIT BUTTON */}

          {this.state.authorid === this.props.auth.user.id ? (
            <React.Fragment>
              <div className="cmsAction">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Update !
                </Button>
              </div>
              <div>{deleteButton}</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="cmsAction">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Update !
                </Button>
                <div>
                  <p className="cmsimagerequired">
                    *Create Your Own to enable Edit.
                  </p>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );

    const noPreview = (
      <div>
        <Card />
      </div>
    );
    const preview = (
      <div>
        <Card raised>
          <div className="cmsImageDiv">
            <img alt="cmsImage" src={this.state.previewFile} />
          </div>
        </Card>
      </div>
    );

    return (
      <React.Fragment>
        {getStaffsLoading && <LoadAnimate position="absolute"> </LoadAnimate>}

        <ToastsContainer store={ToastsStore} />
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center">
              <Col lg="4"></Col>
            </Row>
            <Row className="">
              <Col lg="12">
                <Card raised className="commentForm">
                  <CardTitle>
                    {" "}
                    <br />
                    <h1 className="text-center"> Staffs Edit </h1>
                  </CardTitle>
                  <CardSubtitle>
                    <BreadCrumbGen list={this.state.bread}></BreadCrumbGen>
                  </CardSubtitle>
                  <CardBody>
                    <Row className="">
                      <Col lg="8"> {cmsbody} </Col>
                      <Col lg="4" className="">
                        <div className="m-3">
                          <Card className="card-coin card-plain card">
                            <CardBody>
                              <CardTitle>Upload Image.</CardTitle>
                              <input
                                type="file"
                                onChange={this.fileChangedHandler}
                              />
                            </CardBody>
                          </Card>
                          <Card className="card-coin card-plain card">
                            <CardTitle className="small">PREVIEW</CardTitle>
                            <CardBody className="p-3">
                              {previewFile === null ? noPreview : preview}
                            </CardBody>
                          </Card>
                        </div>
                        <div></div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>{" "}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    profile: state.profile,
    auth: state.auth
  };
};

StaffEdit.propTypes = {
  staffs: PropTypes.object,
  fetchStaff: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStaff, updateStaff }
)(StaffEdit);
