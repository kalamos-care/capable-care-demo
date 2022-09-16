import { useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { LinkButton, Observation, StyledCard } from "../components";
import useObservations from "../fetchDataHooks/useObservations";
import useTarget from "../fetchDataHooks/useTarget";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Renders a success flash if the router state contains showSuccess == true.
function SuccessFlash() {
  const { state } = useLocation();
  const [open, setOpen] = useState(state?.showSuccess);
  const closeAlert = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert icon={false} severity="success">
        Log created!
      </Alert>
    </Snackbar>
  );
}

function ObservationCards({ observations, target }) {
  return observations.map((observation) => {
    return (
      <StyledCard key={observation.id}>
        <Observation observation={observation} target={target} />
      </StyledCard>
    );
  });
}

// Render a log of observations for a goal and an add observations button linking to a form.
export default function ObservationLog({ target, goal }) {
  const navigate = useNavigate();
  const { carePlanId } = useParams();
  const { observations } = useObservations(goal.id, target.id);
  // retrieve additional data about the target
  const { targetData } = useTarget(target.id);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="grey.900" variant="subtitle">
          Logs
        </Typography>

        <LinkButton
          onClick={() => navigate(`/home/${carePlanId}/goals/${goal.id}/log/${target.id}`)}
        >
          + Add log
        </LinkButton>
      </Box>

      {observations && targetData && (
        <ObservationCards observations={observations} target={targetData} />
      )}
      <SuccessFlash />
    </>
  );
}
