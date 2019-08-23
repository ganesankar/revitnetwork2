import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { fetchCities } from "../actions/citiesActions";
import { fetchStudent, updateStudent } from "../actions/studentsActions";
import { deleteCity } from "../actions/cmsActions";
import {
  Button,
  Card,
  Input,
  Media,
  Form,
  Label,
  FormText,
  Container,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroupAddon,
  FormGroupText,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import Header from "../components/layout/Header";

class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: false,
      query: "",
      error: null,
      text: "",
      //EDIT
      cities: [],
      students: [],
      studentname: "",
      sprno: "",
      emailid: "",
      nickname: "",
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
    this.props.fetchStudent(this.props.match.params.url);
    this.setState({
      students: this.props.students.students
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log("componentWillReceiveProps", nextProps);
      let allcities = nextProps.students.student;
      console.log(allcities);
      let selectedValue = nextProps.students.student[0] || {};
      console.log(selectedValue);

      if (Object.keys(selectedValue).length > 0) {
        this.setState({
          id: selectedValue._id,
          studentname: selectedValue.studentname,
          sprno: selectedValue.sprno,
          emailid: selectedValue.emailid,
          nickname: selectedValue.nickname,
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
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentname", this.state.studentname);
    formData.append("sprno", this.state.sprno);
    formData.append("flagimg", this.state.flagimg);
    formData.append("url", this.state.url);
    formData.append("id", this.state.id);
    console.log(";formData");
    console.log(formData);
    this.props.updateStudent(this.state.id, formData);

    this.setState({
      id: "",
      studentname: "",
      sprno: "",
      emailid: "",
      nickname: "",
      dob: "",
      anniversary: "",
      status: "",
      native: "",
      location: "",
      work: "",
      title: "",
      url: "",
      flagimg: null,
      previewFile: null,
      showlist: true
    });

    this.props.fetchStudent();
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
    var val = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      url: val
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  render() {
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
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
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
                <Col></Col>
                <Col></Col>
              </Row>
            </Container>

            <FormGroup>
              <Label for="work">url</Label>
              <Input
                disabled
                label="Please enter nickname:"
                placeholder="url"
                type="url"
                name="url"
                value={this.state.url}
                onChange={this.onSnakecase}
              />
            </FormGroup>
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
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center">
              <Col lg="4">
                <h1 className="text-center"> Students Edit </h1>
                <p>Editing : {this.state.studentname}</p>
                <hr className="line-primary m-auto" />
                <br /> <br />
              </Col>
            </Row>
            <Row className="">
              <Col lg="12">
                <Card raised className="commentForm">
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
                          <CardTitle>Preview.</CardTitle>
                          <CardBody className="p-3">
                            {previewFile === null ? noPreview : preview}
                          </CardBody>
                        </Card>
                      </div>
                      <div></div>
                    </Col>
                  </Row>
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
    cities: state.cities,
    students: state.students,
    profile: state.profile,
    auth: state.auth
  };
};

StudentEdit.propTypes = {
  cities: PropTypes.object,
  students: PropTypes.object,
  fetchStudent: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStudent, updateStudent, deleteCity }
)(StudentEdit);
