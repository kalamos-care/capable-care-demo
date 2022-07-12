import { Link, Stack, Typography, Skeleton } from "@mui/material";
import { ForwardArrowIcon } from "./icons";
import { useNavigate } from "react-router-dom";

import { useCurrentCarePlan } from "../fetchDataHooks";

const ArrowLink = ({ copy }) => {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => navigate("/current_plan")}
      underline="none"
      component="button"
    >
      <Typography
        variant="headline"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
          alignItems: "center",
        }}
      >
        {copy || <Skeleton animation="wave" width="100%" />}
        <ForwardArrowIcon />
      </Typography>
    </Link>
  );
};

export default function CurrentCarePlan() {
  const { currentPlan, isLoading, isError } = useCurrentCarePlan();

  if (isError) return <div>Woops something went wrong...</div>;
  const name = isLoading ? null : currentPlan ? currentPlan.name : "No plan";

  return (
    <Stack>
      <Typography variant="eyebrow"> Current Plan </Typography>
      <ArrowLink copy={name} />
    </Stack>
  );
}
