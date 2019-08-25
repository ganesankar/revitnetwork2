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



function BottomAppBar(props) {

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
                  <NavLink to="/students" tag={Link}>
                    Students
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/staffs" tag={Link}>
                    Staffs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/events" tag={Link}>
                    Events
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
