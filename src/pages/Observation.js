import { useState } from "react";
import * as Sentry from "@sentry/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import api from "../capableApi";
import ObservationField from "../components/ObservationField";
import { DateInput } from "../components/ObservationField";
import ErrorMessage from "../components/ErrorMessage";

const StyledButton = ({ sx, children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        textTransform: "none",
        fontSize: "0.88rem",
        fontWeight: 400,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

// The Capable API returns 't' as true and 'f' as false.
const isBooleanValue = (value) => {
  return ["t", "f"].includes(value);
};

// Component to manage the state of the create observation form.
const Form = ({
  observedValue,
  observedDate,
  target,
  goal,
  origin,
  saveable,
  children,
}) => {
  const navigate = useNavigate();

  let value = observedValue;
  if (isBooleanValue(observedValue)) {
    value = observedValue === "t";
  }

  // State for the Error message.
  const [submissionError, setSubmissionError] = useState(false);

  // Function to submit the form to create a new Observation.
  // On success, we redirect back to the Targets page.
  // On failure, we show an error message and ask the user to try again.
  const createObservation = async (event) => {
    event.preventDefault();

    // NOTE: We use a Date input for this DateTime field to make it easier to demo. Appending the current time to the date prevents local time conversion bugs during demos.
    // If you have forked this app, we advise you use a DateTime input and remove this method.
    const appendCurrentTime = (dateString) => {
      const now = new Date();
      const ISOTime = now.toISOString().split("T")[1];
      return `${dateString}T${ISOTime}`;
    };

    const params = {
      observation: {
        target_id: target.id,
        observed_value: value,
        observed_date: appendCurrentTime(observedDate),
      },
    };

    try {
      await api.client.Observation.create({ body: params });
      setSubmissionError(false);
      navigate(origin, { state: { target, goal, showSuccess: true } });
    } catch (e) {
      setSubmissionError(true);
      Sentry.captureException(e);
      console.error("Create failed!");
    }
  };

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={createObservation}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <StyledButton
            sx={{ color: "grey.700" }}
            onClick={() => navigate(origin, { state: { target, goal } })}
          >
            {" "}
            Cancel{" "}
          </StyledButton>
          {saveable ? (
            <StyledButton color="primary" type="submit">
              {" "}
              Save{" "}
            </StyledButton>
          ) : (
            <StyledButton disabled sx={{ color: "grey.700" }}>
              {" "}
              Save{" "}
            </StyledButton>
          )}
        </Box>

        {children}
      </Box>
      <ErrorMessage show={submissionError} />
    </>
  );
};

export default function Observation() {
  const {
    state: { target, goal, origin },
  } = useLocation();
  const [observedValue, updateObservedValue] = useState();
  const [observedDate, updateObservedDate] = useState();
  const handleInputChange = (e) => updateObservedValue(e.target.value);
  const handleDateChange = (e) => updateObservedDate(e.target.value);

  let inputDataType = target.data_type;
  if (target.tag_list.includes("type:wellness")) inputDataType = "wellness";

  // If the observed value is a datetime we don't need to record the observed date as well.
  const showObservedDate = inputDataType !== "datetime";
  // Enable the save button when all required fields are filled in.
  const saveable = showObservedDate
    ? observedDate && observedValue
    : observedValue;

  return (
    <Container sx={{ paddingTop: "1rem" }}>
      <Form
        target={target}
        goal={goal}
        origin={origin}
        observedValue={observedValue}
        observedDate={observedDate}
        saveable={saveable}
      >
        <Typography variant="h5" sx={{ fontWeight: 500, marginBottom: "1rem" }}>
          {goal.name}
        </Typography>

        {showObservedDate && (
          <DateInput
            label="Date"
            value={observedDate}
            handleInputChange={handleDateChange}
            dateType="date"
            sx={{ marginBottom: "0.5rem" }}
          />
        )}

        <ObservationField
          dataType={inputDataType}
          value={observedValue}
          label={target.name}
          handleChange={handleInputChange}
        />
      </Form>
    </Container>
  );
}
