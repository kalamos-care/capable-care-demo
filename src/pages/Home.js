import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, CardMedia, Avatar, Skeleton, Stack } from "@mui/material";

import { AboutCard, ArrowLink, ControlledTabs, GoalCards, TaskCards } from "../components";
import { useCarePlans, useCurrentPatient } from "../fetchDataHooks";
import gravatar from "../utils/gravatar";

function Header({ carePlan }) {
  // Ignoring any errors because it's just for the avatar URL / email
  // and we'll be graceful about it.
  const { currentPatient } = useCurrentPatient();
  const firstName = currentPatient?.name;

  let avatarUrl;
  if (currentPatient && process.env.REACT_APP_USAGE_MODE === "demo")  {
    avatarUrl =
      currentPatient.avatar_url ||
      (currentPatient.email && gravatar(currentPatient.email));
  }
  else if (currentPatient) {
    avatarUrl = currentPatient.avatar_url
  }

  const CarePlans = carePlan
    ? <ArrowLink copy={carePlan.name} url={"/care_plans"}/>
      : (
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
          No plan
        </Typography>
      )

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <CardMedia
        component="img"
        width="375"
        image={process.env.REACT_APP_LOGO}
        alt="Logo image"
      />

      <Box
        sx={{
          "z-index": 2,
          position: "relative",
          left: 20,
          bottom: 80,
          height: 20,
          width: 0,
        }}
      >
        <Avatar src={avatarUrl} sx={{ height: 80, width: 80 }} />
      </Box>

      <Container>
        <Typography
          sx={{ marginBottom: "1rem" }}
          color="primary"
          variant="h6"
          component="h1"
        >
          Welcome{firstName ? `, ${firstName}` : ""}!
        </Typography>

        <Stack>
          <Typography variant="eyebrow">Current Plan</Typography>
          {CarePlans}
        </Stack>
      </Container>
    </Box>
  );
}

const HomeContent = ({ carePlan }) => {
  const tabs = [
    {
      title: 'Tasks',
      content: <TaskCards carePlan={carePlan} />,
    },
    {
      title: 'Goals',
      content: <GoalCards carePlan={carePlan} />,
    },
    {
      title: 'About',
      content: <AboutCard carePlan={carePlan} />,
    },
  ];

  const [tab, setTab] = useState(tabs[0]);

  if (!carePlan) {
    return null;
  }

  return (
    <ControlledTabs
      tabs={tabs}
      tab={tab}
      handleTabChange={(_, tabTitle) => {
        const tab = tabs.find(tab => tab.title === tabTitle);
        setTab(tab);
      }}
    />
  );
}

export default function Home() {
  const { carePlans, isLoading, isError } = useCarePlans();
  const { care_plan_id } = useParams();
  
  if (isLoading) {
    return (
      <Skeleton variant="rectangular" animation="wave" height={280} />
    );
  }

  if (isError) {
    return (
      <div>Woops something went wrong...</div>
    );
  }

  let currentCarePlan;
  const activeCarePlans = carePlans.filter(carePlan => carePlan.status === "active");
  const completedCarePlans = carePlans.filter(carePlan => carePlan.status === "completed");

  if (care_plan_id) {
    currentCarePlan = [...activeCarePlans, ...completedCarePlans].find(carePlan => carePlan.id === care_plan_id);
  } else if (activeCarePlans.length > 0) {
    currentCarePlan = activeCarePlans[0];
  } else if (completedCarePlans.length > 0) {
    currentCarePlan = completedCarePlans[0];
  }

  return (
    <>
      <Header carePlan={currentCarePlan} />
      <HomeContent carePlan={currentCarePlan}/>
    </>
  );
}
