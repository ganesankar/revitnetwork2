import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  
} from "reactstrap";


const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
});

function BottomAppBar(props) {
  const { classes } = props;

  return (
    <React.Fragment>
       <footer className="footer">
        <Container>
          <Row>
            <Col md="12">
            <Nav>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/landing-page" tag={Link}>
                    Landing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register-page" tag={Link}>
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/profile-page" tag={Link}>
                    Profile
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default BottomAppBar;
