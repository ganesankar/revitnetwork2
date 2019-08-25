import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { fetchStudent, updateStudent } from "../actions/studentsActions";
import { socialNetList } from "../actions/utils/general";
import BreadCrumbGen from "../components/common/BreadCrumbGen";
import LoadAnimate from "../components/common/LoadAnimate";
import {ToastsContainer, ToastsStore} from 'react-toasts';
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
  Col
} from "reactstrap";

let studentActiveUpdate = false;
const sociallist = socialNetList();
class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bread: [
        { name: "Students", link: "/students" },
        { name: "Create / Edit Student", link: "" }
      ],
      showlist: false,
      query: "",
      error: null,
      text: "",
      //EDIT
      students: [],
      social: sociallist.slice(0),

      studentname: "",
      sprno: "",
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
      this.props.fetchStudent(this.props.match.params.url);
      this.setState({
        students: this.props.students.students
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {

      
      let selectedValue = nextProps.students.student[0] || {};

      if (Object.keys(selectedValue).length > 0) {
        this.setState({
          id: selectedValue._id,
          studentname: selectedValue.studentname,
          sprno: selectedValue.sprno,
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
        if (selectedValue.social && selectedValue.social.length > 0) {
          dbSocial = JSON.parse(selectedValue.social);
        }
        this.setState({
          social: dbSocial
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
    studentActiveUpdate = true;
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentname", this.state.studentname);
    formData.append("sprno", this.state.sprno);
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
    this.props.updateStudent(this.state.id, formData);
    this.props.fetchStudent(this.props.match.params.url);
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

  render() {
   
    const {  getStudentsLoading ,studentUpdateSuccess, studentUpdateError } = this.props.students;
    if (studentUpdateSuccess && studentActiveUpdate) {
      ToastsStore.success("Changes Saved Successfully!");
      studentActiveUpdate = false;
    }
    if (studentUpdateError && studentActiveUpdate) {
      ToastsStore.error("Not able to save Changes");
      studentActiveUpdate = false;
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
                  <h4 className="pt-1">College Based Info</h4>
                  <hr className="line-primary " />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentname">Name</Label>
                    <Input
                      label="Please enter Name:"
                      placeholder="Name"
                      type="text"
                      name="studentname"
                      value={this.state.studentname}
                      onChange={this.onSnakecase}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nickname">Nick Name</Label>
                    <Input
                      label="Please enter Nick Name:"
                      placeholder="Nick Name"
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
                      label="Please enter SPR No:"
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
                    <Label for="sprno">SPR No</Label>
                    <Input
                      label="Please enter SPR No:"
                      placeholder="SPR No"
                      type="text"
                      name="sprno"
                      value={this.state.sprno}
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
                      type="text"
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
                      name="Work"
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
        {getStudentsLoading &&  <LoadAnimate position="absolute"> </LoadAnimate> }
        
        <ToastsContainer store={ToastsStore}/>
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
                    <h1 className="text-center"> Students Edit </h1>
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
    students: state.students,
    profile: state.profile,
    auth: state.auth
  };
};

StudentEdit.propTypes = {
  students: PropTypes.object,
  fetchStudent: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStudent, updateStudent }
)(StudentEdit);
