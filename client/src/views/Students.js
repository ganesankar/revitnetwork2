import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStudents } from "../actions/studentsActions";
import { getCurrentProfile } from "./../actions/profileActions";
import { debounce } from "lodash";

import UserListCard from "../components/list/userListCard";
import NotFound from "../components/errors/NotFound";
import LoadAnimate from "../components/common/LoadAnimate";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
   const { students, getStudentsLoading } = this.props.students;
    let filteredstudents = students || [];
    return (
      <div>
        {getStudentsLoading && <LoadAnimate position="absolute"> </LoadAnimate>}
        {!getStudentsLoading && students.length === 0 ? (
          <NotFound status="400" />
        ) : (
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center">
                <Col lg="4">
                  <h1 className="text-center">Students</h1>

                  <hr className="line-primary m-auto" />
                  <Row className="row-grid justify-content-center">
                     <div  className="m-auto">
                       <br/>
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
                      <br/>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                {filteredstudents.length < 1 ? (
                  <div className="paragraphText">
                    There are no destinations matching your search query.
                  </div>
                ) : (
                  <React.Fragment>
                    {filteredstudents.map(student => {
                      return (
                        <React.Fragment key={student._id}>
                          {" "}
                          <Col lg="4">
                            <UserListCard
                              profileData={student}
                              viewLink={true}
                              editLink={true}
                              viewPath="/student/"
                              editPath="/student/edit/"
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
    students: state.students,
    favid: state.favid,
    profile: state.profile
  };
};

Students.propTypes = {
  students: PropTypes.object,
  fetchStudents: PropTypes.func,
  getCurrentProfile: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchStudents, getCurrentProfile }
)(Students);
