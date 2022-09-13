import { Card, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useTarget from "../fetchDataHooks/useTarget";
import { ActionButton } from "../components";
import RichText from "../components/RichText";
import HeaderImage from "../components/HeaderImage";
import ObservationLog from "../components/ObservationLog";

export default function Target() {
  const { state } = useLocation();
  const { goal, target } = state;
  // retrieve additional data about the target
  const { targetData } = useTarget(target.id);

  return (
    <>
      {goal.imageUrl ? (
        <Card sx={{ position: "relative" }}>
          <ActionButton
            type={"back"}
            route={`/goal`}
            params={{ goal: goal }}
            sx={{ position: "absolute", zIndex: 100 }}
          />

          <HeaderImage data={goal} />
        </Card>
      ) : (
        <ActionButton type={"back"} route={`/goal`} params={{ goal: goal }} />
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
