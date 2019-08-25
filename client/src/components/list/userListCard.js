import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, ButtonGroup, Button, Container, Row, Col } from "reactstrap";

class UserListCard extends Component {
  render() {
    const { profileData, viewLink, editLink, viewPath, editPath } = this.props;
    const userIcon =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yMi40MTcsMTQuODM2Yy0xLjIwOSwyLjc2My0zLjg0Niw1LjA3NC02LjQwMyw1LjA3NGMtMy4xMjIsMC01LjM5LTIuMjg0LTYuNTk5LTUuMDQ2ICAgYy03LjAzMSwzLjY0Mi02LjE0NSwxMi44NTktNi4xNDUsMTIuODU5YzAsMS4yNjIsMC45OTQsMS40NDUsMi4xNjIsMS40NDVoMTAuNTgxaDEwLjU2NWMxLjE3LDAsMi4xNjctMC4xODQsMi4xNjctMS40NDUgICBDMjguNzQ2LDI3LjcyMywyOS40NDcsMTguNDc5LDIyLjQxNywxNC44MzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTE2LjAxMywxOC40MTJjMy41MjEsMCw2LjMyLTUuMDQsNi4zMi05LjIwNGMwLTQuMTY1LTIuODU0LTcuNTQxLTYuMzc1LTcuNTQxICAgYy0zLjUyMSwwLTYuMzc2LDMuMzc2LTYuMzc2LDcuNTQxQzkuNTgyLDEzLjM3MywxMi40OTEsMTguNDEyLDE2LjAxMywxOC40MTJ6IiBmaWxsPSIjNTE1MTUxIi8+PC9nPjwvc3ZnPg==";
    const userImage = (
      <div className="icon icon-primary">
        {" "}
        <img
          alt="cmsImage"
          className="img-center img-fluid"
          src={
            profileData && profileData.flagimg ? profileData.flagimg : userIcon
          }
        />
      </div>
    );

    return (
      <React.Fragment>
        <Card>
          <Container fluid>
            <Row>
              <Col className="p-0"> {userImage}</Col>
              <Col>
                <Link
                  to={{ pathname: viewPath + profileData._id }}
                  className="citylist "
                >
                  <h4 className="info-title">{profileData.studentname || profileData.staffname}</h4>
                </Link>

                <hr className="line-primary" />
                <p>
                  {profileData.emailid} <br />
                  {profileData.location}
                  <br />
                  {profileData.nickname}
                </p>
                <ButtonGroup>
                {viewLink  && (
              <NavLink to={{ pathname: viewPath + profileData._id }}>
                <Button className="btn-simple" color="primary" size="sm">
                  VIEW
                </Button>
              </NavLink>
            )}
            {editLink && (
              <NavLink to={{ pathname: editPath + profileData._id }}>
                <Button className="btn-simple" color="success" size="sm">
                  EDIT
                </Button>
              </NavLink>
            )} </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Card>
      </React.Fragment>
    );
  }
}

UserListCard.propTypes = {
  profileData: PropTypes.any,
  viewLink: PropTypes.bool,
  editLink: PropTypes.bool,
  viewPath: PropTypes.string,
  editPath: PropTypes.string
};

export default connect()(UserListCard);
