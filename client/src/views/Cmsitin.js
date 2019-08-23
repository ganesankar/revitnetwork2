import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createItinerary } from "../actions/cmsActions";
import { fetchCities } from "../actions/citiesActions";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import { Button, Form, FormGroup, Label, Input, FormText, Card , Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';



class Cmsitin extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      cities: [],
      author: "",
      authorimage: "",
      title: "",
      activitykey: "",
      duration: "",
      likes: "",
      hashtag: [],
      rating: "",
      price: "",
      cityurl: "",
      cityname: ""
    };
  }

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  //SUBMIT
  onSubmit = e => {
    e.preventDefault();
    const itinData = {
      title: this.state.title,
      activitykey: this.state.activitykey,
      rating: this.state.rating,
      duration: this.state.duration,
      price: this.state.price,
      author: this.props.auth.user.username,
      authorid: this.props.auth.user.id,
      likes: this.state.likes,
      authorimage: this.props.auth.user.avatar,
      cityurl: this.state.cityurl,
      hashtag: this.state.hashtag,
      id: this.state.id
    };

    this.props.createItinerary(itinData);
    // alert("Upload successful");
    this.setState({
      title: "",
      rating: "",
      duration: "",
      price: "",
      likes: "",
      cityurl: "",
      cityname: "",
      activitykey: "",
      author: "",
      hashtag: []
    });
  };

  // FORM INFO
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //CONVERT TO SNAKE CASE
  onSnakecase = e => {
    var value = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      activitykey: value
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  render() {
    const { errors } = this.state;

    const cmstitle = (
      <React.Fragment>
        <Header title={"Create Itineraries"} />
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Or click below to edit an existing Itinerary.</p>
          <div>
            <Link to="/cmsitinerary/edititinerary">
              <Button variant="outlined">Edit Itineraries</Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
    const InputCity = (
      <React.Fragment>
        <FormGroup variant="filled">
          <Label  htmlFor="filled-city-simple">Input City :</Label >
          <Input type="Input"
            className="InputForms"
            value={this.state.cityurl}
            onChange={this.onChange}
            name="cityurl"
            errorform={errors.cityurl}
          >
            <option value="">
              <em>None</em>
            </option>
            {this.props.cities.cities.map(city => {
              return (
                <option key={city._id} value={city.url}>
                  {city.cityname}
                </option>
              );
            })}
          </Input>
          {errors.cityurl && (
            <div className="invalid-feedback">{errors.cityurl}</div>
          )}
        </FormGroup>
      </React.Fragment>
    );
    const InputPrice = (
      <React.Fragment>
        <FormGroup variant="filled">
          <Label  htmlFor="filled-price-simple">
            Input Price Range:
          </Label >
          <Input
            className="InputForms"
            value={this.state.price}
            onChange={this.onChange}
            type="Input"
            name="price"
            errorform={errors.price}
          >
            <option value="">
              <em>None</em>
            </option>
            <option value={"$"}>$</option>
            <option value={"$$"}>$$</option>
            <option value={"$$$"}>$$$</option>
          </Input>
        </FormGroup>
      </React.Fragment>
    );
    const InputRating = (
      <React.Fragment>
        <FormGroup variant="filled">
          <Label  htmlFor="filled-rating-simple">
            Input Rating out of 5:
          </Label >
          <Input
            className="InputForms"
            value={this.state.rating}
            onChange={this.onChange}
            type="Input"
            name="rating"
            errorform={errors.rating}
          >
            <option value="">
              <em>None</em>
            </option>
            <option value={1}>*</option>
            <option value={2}>**</option>
            <option value={3}>***</option>
            <option value={4}>****</option>
            <option value={5}>*****</option>
          </Input>
        </FormGroup>
      </React.Fragment>
    );

    const cmsbody = (
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised className="commentForm">
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
              <div>
                <Input 
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter Itinerary Title:"
                  placeholder=""
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onSnakecase}
                  errorform={errors.title}
                />
              </div>
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
              <div> {InputCity}</div>
              <div>
                <Input 
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter number of Likes:"
                  placeholder=""
                  margin="normal"
                  variant="filled"
                  type="number"
                  name="likes"
                  value={this.state.likes}
                  onChange={this.onChange}
                  errorform={errors.likes}
                />
              </div>
              <div>
                <Input 
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter number of Hours:"
                  placeholder=""
                  margin="normal"
                  variant="filled"
                  type="number"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.onChange}
                  errorform={errors.duration}
                />
              </div>
              <div>{InputRating}</div>
              <div>{InputPrice}</div>
              <div>
                <Input 
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter Hashtags:"
                  placeholder="Seperate with Comma, maximum of 3."
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="hashtag"
                  value={this.state.hashtag}
                  onChange={this.onChange}
                />
              </div>
            </form>

            {/* SUBMIT BUTTON VALIDATION */}
            {!this.state.title ||
            !this.state.rating ||
            !this.state.cityurl ||
            !this.state.duration ||
            !this.state.price ||
            !this.state.likes ||
            this.state.hashtag.length === 0 ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button variant="outlined" color="primary" disabled>
                    Create Itinerary!
                  </Button>
                </div>
                <div>
                  <p className="cmsimagerequired">
                    *Fill out Form to enable Create Itinerary.
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                    value="Submit"
                  >
                    Create Itinerary!
                  </Button>
                </div>
              </React.Fragment>
            )}
          </Card>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {cmsbody}
      </React.Fragment>
    );
  }
}

Cmsitin.propTypes = {
  createItinerary: PropTypes.func,
  fetchCities: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities,
  favid: state.favid,
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createItinerary, fetchCities }
)(Cmsitin);
