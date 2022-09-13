import * as Sentry from "@sentry/react";
import { Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { WELLNESS_MAPPING } from "./WellnessEmoji";

// Component to wrap the input field in a label.
const LabelWrapper = ({ label, children }) => (
  <Grid container spacing={1}>
    <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontSize: "0.9rem", paddingY: "auto", marginLeft: "1rem" }}>
        {label}
      </Typography>
    </Grid>

    <Grid item xs={6} sx={{ textAlign: "right" }}>
      {children}
    </Grid>
  </Grid>
);

// Renders the input field with appropriate styling.
const StyledTextField = ({ type, step, handleInputChange }) => {
  const inputProps = { style: { fontSize: "0.9rem", textAlign: "right" } };
  if (type == "number") inputProps.step = step || 1;

  return (
    <TextField
      margin="dense"
      type={type}
      fullWidth
      InputLabelProps={{ disabled: true }}
      inputProps={inputProps}
      onChange={handleInputChange}
    />
  );
};

// Renders the input field for a string.
const StringInput = (props) => <StyledTextField type="text" {...props} />;

// Renders the input field for an integer.
const IntegerInput = (props) => <StyledTextField type="number" {...props} />;

// Renders the input field for a float.
const FloatInput = (props) => <StyledTextField type="number" step="0.001" {...props} />;

// Renders the input field for a boolean.
// The Capable API returns 't' as true and 'f' as false, keeping it the same here.
const BooleanInput = (props) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={props.value}
      exclusive
      onChange={props.handleInputChange}
    >
      <ToggleButton value="f">No</ToggleButton>
      <ToggleButton value="t">Yes</ToggleButton>
    </ToggleButtonGroup>
  );
};

// Renders the input field for an data with a little styling..
export const DateInput = ({ label, value, handleInputChange, dateType = "datetime-local", sx }) => {
  const styling = {
    borderStyle: "solid",
    borderRadius: "0.2rem",
    borderWidth: "0.01rem",
    fontSize: "0.9rem",
    padding: "0.3rem",
    outlineColor: process.env.REACT_APP_COLOR,
    ...sx,
  };
  if (value) {
    styling.borderColor = process.env.REACT_APP_COLOR;
    styling.borderWidth = "0.1rem";
    styling.outline = "none";
  }
  {
    /* date format for the input max value is 'yyyy-mm-dd' */
  }
  const today = new Date().toISOString().split("T")[0];

  return (
    <Grid container spacing={1}>
      <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "0.9rem", paddingY: "auto", marginLeft: "1rem" }}>
          {label}
        </Typography>
      </Grid>

      <Grid item xs={7} sx={{ textAlign: "right" }}>
        {/* NOTE: max & min are not supported by Safari, install a date picker library if support is required */}
        <input max={today} style={styling} type={dateType} onChange={handleInputChange} />
      </Grid>
    </Grid>
  );
};

// Renders a series of exclusive buttons with emoticons as button labels.
// Underneath, the emoticons correspond to integer values.
const WellnessInput = ({ label, value, handleInputChange }) => {
  return (
    <>
      <Typography sx={{ fontSize: "0.9rem", margin: "0.5rem" }}> {label}: </Typography>
      <ToggleButtonGroup
        value={value}
        color="primary"
        fullWidth
        exclusive
        onChange={handleInputChange}
        aria-label="wellness rating"
      >
        {WELLNESS_MAPPING.map((icon, index) => (
          <ToggleButton
            key={icon}
            // Note: Material UI requires a string as the value, for some reason....
            value={index.toString()}
            aria-label={index}
          >
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

// Renders the correct type of input field.
const InputField = ({ dataType, label, value, handleChange }) => {
  switch (dataType) {
    case "boolean":
      return (
        <LabelWrapper label={label}>
          <BooleanInput value={value} handleInputChange={handleChange} />
        </LabelWrapper>
      );
    case "integer":
      return (
        <LabelWrapper label={label}>
          <IntegerInput handleInputChange={handleChange} />
        </LabelWrapper>
      );
    case "float":
      return (
        <LabelWrapper label={label}>
          <FloatInput handleInputChange={handleChange} />
        </LabelWrapper>
      );
    case "datetime":
      return <DateInput label={label} value={value} handleInputChange={handleChange} />;
    case "string":
      return (
        <LabelWrapper label={label}>
          <StringInput handleInputChange={handleChange} />
        </LabelWrapper>
      );
    case "wellness":
      return <WellnessInput label={label} value={value} handleInputChange={handleChange} />;
    default:
      // Throw and error and report to Sentry
      console.error(`Unsupported input dataType: ${dataType}`);
      Sentry.captureMessage(`Unsupported input dataType: ${dataType}`);
  }
};

const ObservationField = ({ value, dataType, label, handleChange }) => {
  return <InputField label={label} value={value} dataType={dataType} handleChange={handleChange} />;
};

export default ObservationField;
