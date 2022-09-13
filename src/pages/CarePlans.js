import {
  Box,
  CardContent,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { ActionButton, StyledCard } from "../components";
import { useCarePlans, useGoalsByStatus } from "../fetchDataHooks";
import { carePlanAtom } from "../atoms";

const CarePlan = ({ carePlan, completedGoalsCount, openGoalsCount }) => {
  const navigate = useNavigate();
  const [, setCarePlan] = useAtom(carePlanAtom);

  return (
    <StyledCard
      sx={{ marginTop: "1rem", padding: 0, cursor: "pointer" }}
      onClick={() => {
        setCarePlan(carePlan);
        navigate(`/home/${carePlan.id}`);
      }}
    >
      <LinearProgress
        variant="determinate"
        value={
          (completedGoalsCount / (completedGoalsCount + openGoalsCount)) * 100
        }
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="subtitle" sx={{ letterSpacing: "0.01rem" }}>
          {carePlan.name}
        </Typography>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          <Typography color="grey.900" variant="eyebrow">
            {`${openGoalsCount} open goals`}
          </Typography>
          <Typography color="grey.900" variant="eyebrow">
            {`${completedGoalsCount} completed goals`}
          </Typography>
        </div>
      </CardContent>
    </StyledCard>
  );
};

const CarePlansForStatus = ({ status, carePlans, goals }) => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Typography variant="subtitle">{status}</Typography>
      {carePlans.map((carePlan) => {
        const openGoalsCount = goals.open.filter(
          (goal) => goal.care_plan_id === carePlan.id
        ).length;
        const completedGoalsCount = goals.completed.filter(
          (goal) => goal.care_plan_id === carePlan.id
        ).length;

        return (
          <CarePlan
            carePlan={carePlan}
            openGoalsCount={openGoalsCount}
            completedGoalsCount={completedGoalsCount}
          />
        );
      })}
    </Box>
  );
};

export default function CarePlans() {
  const {
    carePlans,
    isLoading: isLoadingCarePlans,
    isError: isErrorCarePlans,
  } = useCarePlans();
  const {
    goals,
    isLoading: isLoadingGoalsByStatus,
    isError: isErrorGoalsByStatus,
  } = useGoalsByStatus();

  if (isLoadingCarePlans || isLoadingGoalsByStatus) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isErrorCarePlans || isErrorGoalsByStatus) {
    return <div>Woops something went wrong...</div>;
  }

  const activeCarePlans = carePlans.filter(
    (carePlan) => carePlan.status === "active"
  );
  const ActiveCarePlans =
    activeCarePlans.length > 0 ? (
      <CarePlansForStatus
        status={"Active"}
        carePlans={activeCarePlans}
        goals={goals}
      />
    ) : null;

  const completedCarePlans = carePlans.filter(
    (carePlan) => carePlan.status === "completed"
  );
  const CompletedCarePlans =
    completedCarePlans.length > 0 ? (
      <CarePlansForStatus
        status={"Completed"}
        carePlans={completedCarePlans}
        goals={goals}
      />
    ) : null;

  return (
    <>
      <Box>
        <ActionButton
          type={"back"}
          sx={{ backgroundColor: "#F3F4F5" }}
          route="/home"
        />
      </Box>
      <Box sx={{ margin: "16px" }}>
        <Typography variant="headline">Care Plans</Typography>
        {ActiveCarePlans}
        {CompletedCarePlans}
      </Box>
    </>
  );
}
