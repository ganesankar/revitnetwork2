import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  postFavorites,
  removeFavorites,
  fetchItinerariesID
} from "./../../actions/profileActions";
import {
  fetchItineraries,
  fetchItinerariesByCity
} from "./../../actions/itinerariesActions";
import { fetchActivityByKey } from "./../../actions/activitiesActions";
import { fetchAxiosComments } from "./../../actions/commentActions";
import Activity from "./../Activity";
import Comments from "./../Comments";

import StarRatingComponent from "react-star-rating-component";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup ,Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, Col ,Container,Toast, ToastBody, ToastHeader,
  Row
  } from "reactstrap";

class ItinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isBtn: false,
      eventId: "",

      activities: [],
      itineraries: [],
      comments: [],
      errors: {}
    };

    this.addToFav = this.addToFav.bind(this);
    this.confirmButton = this.confirmButton.bind(this);
    this.expandOpen = this.expandOpen.bind(this);
    this.expandClose = this.expandClose.bind(this);
  }

  // CLOSE DIALOG
  dialogClose = () => {
    this.setState({ open: false });
  };

  // CLOSE SNACKBAR
  snackbarClose = () => {
    this.setState({ snackbar: false });
  };

  // SAVE TO FAVORITES BUTTON
  addToFav = async event => {
    this.setState({ open: true });
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;

    await setTimeout(() => {
      this.props.postFavorites(userID, favData);
    }, 1500);
  };

  // REMOVE FAV AND CLOSE SNACKBAR
  handleOpen = event => {
    this.setState({ open: true, snackbar: false });
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    this.setState({
      favdataid: favData.favorites
    });
  };

  // REMOVE FAV - CONFIRM BUTTON
  confirmButton = async () => {
    let userID = this.props.auth.user.id;
    let favData = {
      favorites: this.state.favdataid
    };

    await setTimeout(() => {
      this.setState({
        open: false,
        confirm: true,
        snackbar: true
      });
    }, 1000);

    if (this.state.confirm === true) {
      await this.props.removeFavorites(userID, favData.favorites);
    }
  };

  // OPEN (FETCH) ACTIVITY AND COMMENTS
  expandOpen(event) {
    let eventTargetId = event.target.id;

    this.props.fetchActivityByKey(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);

    this.setState(() => ({
      eventId: eventTargetId,
      isBtn: eventTargetId
    }));
  }

  //CLOSE ACTIVITY AND COMMENTS
  expandClose() {
    this.setState(() => ({
      eventId: null,
      isBtn: null
    }));
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const addFavDialog = (
      <React.Fragment>
        <Modal 
          isOpen={this.state.open}
          toggle={this.dialogClose}
          backdrop
        >
          <ModalHeader  id="alert-dialog-title">
            {"MYtinerary added to your Favorites"}
          </ModalHeader>
          <ModalBody>
            <div id="alert-dialog-description">
              This itinerary has been added to your favorites. Go to Favorites
              page to view and manage your Itineraries.
            </div>
          </ModalBody>
          <ModalFooter>
            <Link to="/dashboard" className="gotoFav">
              <Button
                className="confirmButtonButton"
                variant="extended"
                size="small"
                color="primary"
                onClick={this.dialogClose}
              >
                Go To Favorites
              </Button>
            </Link>
            <Button onClick={this.dialogClose} color="inherit" autoFocus>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );

    const removeFavDialog = (
      <React.Fragment>
        <Modal
          open={this.state.open}
          onClose={this.dialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <ModalHeader id="alert-dialog-title">
            {"Are you sure you want to delete MYtinerary from your Favorites?"}
          </ModalHeader>
          <ModalBody>
            <div id="alert-dialog-description">
              Please confirm you want to delete this MYtinerary from your
              Favorites.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="confirmButtonButton"
              variant="extended"
              size="small"
              color="primary"
              onClick={this.confirmButton.bind(this)}
            >
              Confirm
            </Button>
            <Button onClick={this.dialogClose} color="inherit" autoFocus>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );

    const unauthedIcons = (
      <React.Fragment>
        <div className="itinIconpanel">
          <Button variant="round" disabled>
            loca
          </Button>
        </div>
      </React.Fragment>
    );

    const authedIcons = (
      <React.Fragment>
        <div className="itinIconpanel">
          {/*  TERNARY CONDITION*/}
          {this.props.profile.favid.includes(this.props._id) ? (
            <React.Fragment>
              {/*  DASHBOARD CONDITION*/}
              {this.props.history === "/dashboard" ? (
                <React.Fragment>
                  {/*  DASHBOARD PAGE CONDITION - FAV REMOVE*/}
                  <Button variant="round">
                    <i
                      value={this.props.title}
                      variant="outlined"
                      fontSize="large"
                      onClick={this.handleOpen.bind(this, this.props._id)}
                    >
                      favorite_border
                    </i>
                    {removeFavDialog}
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/*  DASHBOARD PAGE CONDITION - FAV SAVED*/}
                  <Button variant="round" disabled>
                    <i value={this.props.title} fontSize="large">
                      favorite
                    </i>
                  </Button>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/*  ITIN PAGE CONDITION - ADD TO FAV*/}
              <Button variant="round">
                <i
                  value={this.props.title}
                  fontSize="large"
                  onClick={this.addToFav.bind(this, this.props._id)}
                >
                  add_location
                </i>
                {addFavDialog}
              </Button>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised>
            {/* CARD HEADER */}
            <Container>
            <Row container spacing={0}>
              <Col item xs={9} sm={6}>
                <div className="itinCardDiv">
                  <h2 className="itinCardTitleText">{this.props.title}</h2>
                  <div className="itinCardTitleBy">By: {this.props.author}</div>
                </div>
              </Col>
              {/* CARD ICONS => TERNARY : AUTHED : UNAUTHED */}
              <Col item xs={3} sm={6}>
                {isAuthenticated ? authedIcons : unauthedIcons}
              </Col>
            </Row>
            </Container>

            {/* CARD CONTENT */}
            <Container>
              <Row  spacing={0}>
                <Col item xs={5} sm={6}>
                  <div className="dashboardImgDiv">
                    <img
                      alt="profile"
                      src={this.props.authorimage}
                      className="dashboardImg"
                    />
                  </div>
                </Col>
                <Col item xs={7} sm={6}>
                  {/* TIME */}
                  <Col item xs={10}>
                    <div>• Time: {this.props.duration} Hours</div>
                  </Col>
                  {/* COST */}
                  <Col item xs={10}>
                    <div>• Cost: {this.props.price}</div>
                  </Col>
                  {/* LIKES */}
                  <Col item xs={10}>
                    <div>• Likes: {this.props.likes} </div>
                  </Col>

                  {/* RATINGS */}
                  <Col item xs={10}>
                    <div className="starRatingComponentDiv">
                      • Rating:
                      <StarRatingComponent
                        className="starRatingComponent"
                        name="Rating"
                        starCount={5}
                        value={this.props.ratings}
                        editing={false}
                      />
                    </div>
                  </Col>
                  {/* HASHTAGS */}
                  <Col item xs={12}>
                    <div>
                      • Hashtags:{" "}
                      {this.props.hashtag.map(item => {
                        return (
                          <React.Fragment key={item + item}>
                            {" "}
                            <Link
                              to={{
                                pathname:
                                  "/hashtag/" +
                                  item.toLowerCase().replace("#", ""),
                                state: {
                                  hashtag: { item }
                                }
                              }}
                            >
                              <span className="hashtagTags">{item}</span>
                            </Link>{" "}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Col> </Col>
                </Row>
              </Container>

            {/* {BUTTON} */}
            {this.state.eventId === this.props.activitykey ? (
              [
                <Activity
                  itineraryKey={this.props.activitykey}
                  key={this.props.title}
                />,

                <Comments
                  activityKey={this.props.activitykey}
                  key={this.props._id}
                />,

                <button
                  className="closeActivityBtn"
                  id={this.props.activitykey}
                  onClick={this.expandClose}
                  key={this.props.title + this.props._id}
                >
                  Close
                </button>
              ]
            ) : (
              <button
                className="viewActivityBtn "
                id={this.props.activitykey}
                onClick={this.expandOpen}
                key={this.props.title + this.props._id}
              >
                Expand
              </button>
            )}

            {/* END OF CARD */}
          </Card>
        </div>
        <Toast 
          isOpen={this.state.snackbar}
          toggle={this.snackbarClose}
          autoHideDuration={2500}
          variant="success"
          >
          <ToastHeader toggle={this.toggle}>Favorite Removed</ToastHeader>
          <ToastBody>
           </ToastBody>
        </Toast>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    profile: state.profile,
    auth: state.auth,
    favid: state.favid,
    activities: state.activities,
    comments: state.comments,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  {
    fetchItineraries,
    postFavorites,
    getCurrentProfile,
    removeFavorites,
    fetchActivityByKey,
    fetchAxiosComments,
    fetchItinerariesID,
    fetchItinerariesByCity
  }
)(ItinCard);
