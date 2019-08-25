import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

class NotFound extends Component {
  render() {
    const { status } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h1>
                      <FontAwesomeIcon icon={faBug} className={`text-error`} />{" "}
                      Not Found
                    </h1>
                  </CardTitle>
                  <CardSubtitle>Something went wrong !</CardSubtitle>
                  <CardText>
                    <p>
                      Page/ Content/ User you are looking for is not available!
                    </p>
                  </CardText>
                  <Link to="/" className="btn ">Home</Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

NotFound.propTypes = {
  status: PropTypes.any
};

export default connect()(NotFound);
