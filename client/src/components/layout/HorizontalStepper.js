import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Alert 
  
} from "reactstrap";
const styles = theme => ({
  root: {
    width: "80%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Cities", "Itineraries", "Activities"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Create your city and/or edit an existing city. Make sure to include high quality images. `;
    case 1:
      return "Create your itinerary and/or edit an existing itinerary. Your itinerary will use your avatar image from your user profile. We recommend to include between 3-5 hashtags.";
    case 2:
      return `Create your Activity and/or edit an existing activity. Make sure to include high quality images. `;
    default:
      return "Unknown step";
  }
}

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set()
  };

  isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="cmsBox">
        <Card raised className="cmsCard">
          <div>
            {activeStep === steps.length ? (
              <div className="cmsTitletext">
                <Alert className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Alert>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <div className="cmsTitletext">
                  <Alert className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Alert>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#039be5"
                      }}
                      variant="contained"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default HorizontalLinearStepper;
