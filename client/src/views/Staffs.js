import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStaffs } from "../actions/staffsActions";
import { debounce } from "lodash";

import UserListCard from "../components/list/userListCard";
import NotFound from "../components/errors/NotFound";
import LoadAnimate from "../components/common/LoadAnimate";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: []
    };
  }

  componentDidMount() {
    this.props.fetchStaffs();
  }

  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    const { staffs, getStaffsLoading , getStaffsFailed} = this.props.staffs;
     let filteredstaffs = staffs || [];
    return (
      <div>
        {getStaffsLoading && <LoadAnimate position="absolute"> </LoadAnimate>}
        {!getStaffsLoading && getStaffsFailed  ? (
          <NotFound status="400" />
        ) : (
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center">
                <Col lg="4">
                  <h1 className="text-center">Staffs</h1>

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
                {filteredstaffs.length < 1 ? (
                  <div className="paragraphText">
                    There are no destinations matching your search query.
                  </div>
                ) : (
                  <React.Fragment>
                    {filteredstaffs.map(staff => {
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
    staffs: state.staffs
  };
};

Staffs.propTypes = {
  staffs: PropTypes.object,
  fetchStaffs: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStaffs }
)(Staffs);
