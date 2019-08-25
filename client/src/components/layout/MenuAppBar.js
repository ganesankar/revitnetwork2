import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Media
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faSignOutAlt,
  faSignInAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      left: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // NAVIGATION
    const loginState = (
      <React.Fragment>
        {/* <Divider /> */}
        <NavItem className="p-0 MenuNavLink">
          <NavLink href="/">
          <FontAwesomeIcon icon={faHome} />
            <span className="">Home</span>
          </NavLink>
        </NavItem>
        <NavItem className="p-0 MenuNavLink">
          <NavLink href="/students">
          <FontAwesomeIcon icon={faUserGraduate} />
            <span className="">Students</span>
          </NavLink>
        </NavItem>
        <NavItem className="p-0 MenuNavLink">
          <NavLink href="/staffs">
          <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span className="">Staffs</span>
          </NavLink>
        </NavItem>
        <NavItem className="p-0 MenuNavLink">
          <NavLink onClick={this.onLogoutClick.bind(this)} to="/">
          <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="">Log Out</span>
          </NavLink>
        </NavItem>
      </React.Fragment>
    );

    const logoutState = (
      <div>
        <NavItem className="p-0 MenuNavLink">
          <NavLink href="/login">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span className="">Login</span>
          </NavLink>
        </NavItem>
      </div>
    );

    const sideList = (
      <React.Fragment>
        {isAuthenticated ? loginState : logoutState}
      </React.Fragment>
    );

    // LINKS
    const authLinks = (
      <div>
        <div>
          <NavLink to="/">
          <img alt={user.name} className="img-center img-fluid  rounded-circle menuUsrImg" src={user.avatar} />                              
           
          </NavLink>
        </div>
      </div>
    );
    const guestLinks = (
      <div>
        <Link className="nav-link" to="/login">
        <FontAwesomeIcon icon={faSignInAlt} />
            <span className="">Login</span>
        </Link>
      </div>
    );

    return (
      <div>
        <Navbar
          className={"fixed-top " + this.state.color}
          color-on-scroll="100"
          expand="lg"
        >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                data-placement="bottom"
                to="/"
                rel="noopener noreferrer"
                title="Designed and Coded by Creative Tim"
                tag={Link}
              >
                <img
                  className="homeBrand"
                  alt="logo_image"
                  src={require("../../images/revit.png")}
                />{" "}
                <span>REVIT </span>
              </NavbarBrand>
              <button
                aria-expanded={this.state.collapseOpen}
                className="navbar-toggler navbar-toggler"
                onClick={this.toggleCollapse}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse
              className={"justify-content-end " + this.state.collapseOut}
              navbar
              isOpen={this.state.collapseOpen}
              onExiting={this.onCollapseExiting}
              onExited={this.onCollapseExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      REVIT
                    </a>
                  </Col>
                  <Col className="collapse-close text-right" xs="6">
                    <button
                      aria-expanded={this.state.collapseOpen}
                      className="navbar-toggler"
                      onClick={this.toggleCollapse}
                    >
                      <i className="tim-icons icon-simple-remove" />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav navbar>
                {sideList}

                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(MenuAppBar);
