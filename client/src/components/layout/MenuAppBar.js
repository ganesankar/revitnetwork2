import React from "react";
import PropTypes from "prop-types";
// reactstrap components
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
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import Icon from "@material-ui/core/Icon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

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
        <NavItem className="p-0">
                <NavLink     href="/dashboard"   >
                  <i className="fab fa-twitter" />
                  <p className="">Dashboard</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink     href="/cms"   >
                  <i className="fab fa-twitter" />
                  <p className="">Dashboard</p>
                </NavLink>
              </NavItem>
        <NavItem className="p-0">
                <NavLink
                 onClick={this.onLogoutClick.bind(this)} to="/"
                >
                  <i className="fab fa-facebook-square" />
                  <p className="">Log Out</p>
                </NavLink>
              </NavItem>
       
        
        {/* <Divider /> */}
        
        {/* <Divider /> */}
        {/* <ListItem button>
          <NavLink to="/cmscity">
            <Icon className="navIcon">edit_location</Icon>
            <span className="navText">Create/Edit City</span>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink to="/cmsitinerary">
            <Icon className="navIcon">add_to_photos</Icon>
            <span className="navText">Create/Edit Itinerary</span>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink to="/cmsactivity">
            <Icon className="navIcon">add_a_photo</Icon>
            <span className="navText">Create/Edit Activity</span>
          </NavLink>
        </ListItem> */}
      </React.Fragment>
    );

    const logoutState = (
      <div>
        <NavItem className="p-0">
                <NavLink     href="/login"   >
                  <i className="fab fa-login" />
                  <p className="">Login</p>
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
            <Avatar
              alt={user.name}
              src={user.avatar}
              title="Gravatar and Image Files supported."
            />
          </NavLink>
        </div>
      </div>
    );
    const guestLinks = (
      <div>
        <Link className="nav-link" to="/login">
          <AccountCircle className="IconaAccountCircle" fontSize="large" />
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
            /> <span>REVIT </span>
              
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
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://twitter.com/CreativeTim"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <i className="fab fa-twitter" />
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://www.facebook.com/CreativeTim"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Like us on Facebook"
                >
                  <i className="fab fa-facebook-square" />
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
              </NavItem>
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
