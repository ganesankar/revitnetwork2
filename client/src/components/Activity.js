import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  Button
  
} from "reactstrap";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class Activity extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.activities.activities.length;

    return (
      <div className="sliderDiv">
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.props.activities.activities.map((activity, index) => (
            <React.Fragment key={activity.title}>
              <div>
                {Math.abs(activeStep - index) <= 2 ? (
                  <React.Fragment>
                    <div className="container">
                      <img
                        className="sliderImg"
                        src={activity.image}
                        alt={activity.title}
                      />

                      <div className="sliderTextCentre">{activity.title}</div>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </AutoPlaySwipeableViews>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

Activity.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
)(Activity);


