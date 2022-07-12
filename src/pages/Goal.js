import { Box, Card, Container, Stack, Typography } from "@mui/material";
import BackButton from "../components/BackButton";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkButton, Recurrence, RichText, StyledCard } from "../components";
import { ForwardArrowIcon } from "../components/icons";
import HeaderImage from "../components/HeaderImage";
import ObservationLog from "../components/ObservationLog";

// Render a card detailing the target & linking to the target page to show it's observations.
function TargetCard({ target, goal }) {
  const navigate = useNavigate();
  const changePage = (route, params) => {
    navigate(route, { state: params });
  };

  return (
    <StyledCard
      sx={{ cursor: "pointer" }}
      onClick={() => changePage("/target", { target: target, goal: goal })}
    >
      <Stack sx={{ gap: 0 }}>
        <Typography variant="h7">{target.name}</Typography>

        <Typography variant="h7">{target.description}</Typography>

        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <LinkButton>View logs</LinkButton>

          <ForwardArrowIcon sx={{ marginLeft: 1, fontSize: "0.625rem" }} />
        </Box>
      </Stack>
    </StyledCard>
  );
}

// When there is only 1 target on the page, we show the observations on this page.
// When there are multiple targets, we show the targets and link each one to a target
// page to list the observations there.
function renderTargetsOrObservations(goal) {
  const targets = goal.targets;
  if (targets.length > 1) {
    return (
      <>
        <Typography color="grey.900" variant="subtitle">
          Targets
        </Typography>
        {targets.map((target) => (
          <TargetCard key={target.id} target={target} goal={goal} />
        ))}
      </>
    );
  } else {
    const [target] = targets;
    return target ? (
      <ObservationLog key={target.id} target={target} goal={goal} />
    ) : (
      <></>
    );
  }
}

export default function Goal() {
  const { state } = useLocation();
  const { goal } = state;

  return (
    <>
      <Card sx={{ position: "relative" }}>
        <BackButton route="/home" sx={{ position: "absolute", zIndex: 100 }} />

        <HeaderImage data={goal} />
      </Card>

      <Container sx={{ marginBottom: 5 }}>
        <Typography variant="headline" component="h2" sx={{ marginY: 3 }}>
          {goal.name}
        </Typography>

        {goal.cron_expression && (
          <Recurrence cron_expression={goal.cron_expression} />
        )}

        <RichText content={goal.description} />

        {renderTargetsOrObservations(goal)}
      </Container>
    </>
  );
}
