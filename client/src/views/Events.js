import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/EventsActions";
import { debounce } from "lodash";

import UserListCard from "../components/list/userListCard";
import NotFound from "../components/errors/NotFound";
import LoadAnimate from "../components/common/LoadAnimate";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Events: []
    };
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    
    const { Events, getEventsLoading , getStaffFailed} = this.props.Events;
    let filteredEvents = Events || [];
    return (
      <div>
        {getEventsLoading && <LoadAnimate position="absolute"> </LoadAnimate>}
        {!getEventsLoading && getStaffFailed  ? (
          <NotFound status="400" />
        ) : (
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center">
                <Col lg="4">
                  <h1 className="text-center">Events</h1>

                  <hr className="line-primary m-auto" />
                  <Row className="row-grid justify-content-center">
                    <Col lg="6"></Col>
                    <Col lg="6">
                      <Input
                        id="filled-with-placeholder"
                        label="Search Destinations"
                        type="text"
                        placeholder="Type to Search "
                        onChange={e => this.handleSearch(e.target.value)}
                        margin="normal"
                        className="cityfilter"
                        variant="outlined"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                {filteredEvents.length < 1 ? (
                  <div className="paragraphText">
                    There are no destinations matching your search query.
                  </div>
                ) : (
                  <React.Fragment>
                    {filteredEvents.map(staff => {
                      return (
                        <React.Fragment key={staff._id}>
                          {" "}
                          <Col lg="4">
                            <UserListCard
                              profileData={staff}
                              viewLink={true}
                              editLink={true}
                              viewPath="/staff/"
                              editPath="/staff/edit/"
                            />
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                )}
              </Row>
            </Container>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Events: state.Events
  };
};

Events.propTypes = {
  Events: PropTypes.object,
  fetchEvents: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(Events);
