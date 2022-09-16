import { Box, Card, Container, Skeleton, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGoal } from "../hooks/useGoal";
import ActionButton from "components/ActionButton";
import {
  HeaderImage,
  LinkButton,
  ObservationLog,
  Recurrence,
  RichText,
  StyledCard,
} from "components";
import { ForwardArrowIcon } from "components/icons";
import api from "capableApi/index";
import { useCRMContent } from "fetchDataHooks";

// Render a card detailing the target & linking to the target page to show it's observations.
function TargetCard({ target, goal }) {
  const navigate = useNavigate();

  return (
    <StyledCard
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/home/${goal.care_plan_id}/goals/${goal.id}/target/${target.id}`)}
    >
      <Stack sx={{ gap: 0 }}>
        <Typography variant="h7">{target.name}</Typography>

        <Typography variant="h7">{target.description}</Typography>

        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
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
  if (!goal) return;
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
    return target ? <ObservationLog key={target.id} target={target} goal={goal} /> : <></>;
  }
}

export default function Goal() {
  const { goalId, carePlanId } = useParams<{ goalId: string; carePlanId: string }>();
  const { data: goal, isLoading: goalLoading, isError: goalError, refetch } = useGoal(goalId);
  const { isLoading } = useCRMContent(goal);
  const isGoalAchieved =
    goal?.achievement_status === "achieved" || goal?.achievement_status === "not_attainable";

  const updateAchievementStatus = async () => {
    const new_achievement_status = isGoalAchieved ? "in_progress" : "achieved";

    await api.client.Goal.update(goal.id, {
      body: {
        goal: {
          achievement_status: new_achievement_status,
        },
      },
    });
    refetch();
  };

  if (isLoading || goalLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (goalError) {
    return <Navigate to={`/home/${carePlanId}`} />;
  }

  return goal ? (
    <>
      {goal.imageUrl ? (
        <Card sx={{ position: "relative" }}>
          <ActionButton
            type={"back"}
            route={`/home/${carePlanId}/goals`}
            sx={{ position: "absolute", zIndex: 100 }}
          />

          <HeaderImage data={goal} />
        </Card>
      ) : (
        <ActionButton type={"back"} route={`/home/${carePlanId}/goals`} />
      )}

      <Container
        sx={{
          overflow: "auto",
          position: "relative",
        }}
      >
        <Typography variant="headline" component="h2" sx={{ marginY: 3 }}>
          {goal.name}
        </Typography>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {goal.cron_expression && <Recurrence cron_expression={goal.cron_expression} />}

          {isGoalAchieved && (
            <Box sx={{ display: "flex", gap: 0.5, marginTop: "0.5rem" }}>
              <CheckIcon style={{ color: "black" }} />
              <Typography
                variant="eyebrow"
                sx={{
                  fontWeight: 300,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                Complete
              </Typography>
            </Box>
          )}
        </div>

        <RichText content={goal.description} />

        {renderTargetsOrObservations(goal)}
      </Container>

      <Container
        sx={{
          position: !isGoalAchieved && "sticky",
          bottom: "1rem",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <Card
          sx={{
            backgroundColor: isGoalAchieved ? "white" : process.env.REACT_APP_COLOR,
            cursor: "pointer",
          }}
          onClick={updateAchievementStatus}
        >
          <Typography
            component="h2"
            sx={{
              color: isGoalAchieved ? process.env.REACT_APP_COLOR : "white",
              marginY: "1rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {isGoalAchieved ? "Mark as Open" : "Mark Complete"}
          </Typography>
        </Card>
      </Container>
    </>
  ) : null;
}
