import { Card, Container, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGoal } from "../features/goals/hooks/useGoal";
import useTarget from "../fetchDataHooks/useTarget";
import { ActionButton } from "../components";
import RichText from "../components/RichText";
import HeaderImage from "../components/HeaderImage";
import ObservationLog from "../components/ObservationLog";
import { useCRMContent } from "../fetchDataHooks";

export default function Target() {
  const { goalId, targetId } = useParams();
  const { data: goal } = useGoal(goalId);
  const { isLoading } = useCRMContent(goal);
  const { targetData, isLoading: targetLoading } = useTarget(targetId);

  if (isLoading || targetLoading || !goal) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  return (
    <>
      {goal.imageUrl ? (
        <Card sx={{ position: "relative" }}>
          <ActionButton
            type={"back"}
            route={`/home/${goal.care_plan_id}/goals/${goal.id}`}
            params={{ goal: goal }}
            sx={{ position: "absolute", zIndex: 100 }}
          />

          <HeaderImage data={goal} />
        </Card>
      ) : (
        <ActionButton type={"back"} route={`/home/${goal.care_plan_id}/goals/${goal.id}`} />
      )}

      {targetData && (
        <Container sx={{ marginBottom: 5 }}>
          <Typography variant="headline" component="h2" sx={{ marginY: 3 }}>
            {targetData.name}
          </Typography>

          <RichText content={targetData.description} />

          <ObservationLog target={targetData} goal={goal} />
        </Container>
      )}
    </>
  );
}
