import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardMedia, Container, Avatar, Skeleton, Stack, Typography } from "@mui/material";

import { AboutCard, ArrowLink, ControlledTabs, GoalCards, TaskCards } from "../components";
import { useCarePlans, useCurrentPatient } from "../fetchDataHooks";
import gravatar from "../utils/gravatar";

function Header({ carePlan, patient }) {
  // Ignoring any errors because it's just for the avatar URL / email
  // and we'll be graceful about it.
  const firstName = patient?.name;

  let avatarUrl;
  if (patient && process.env.REACT_APP_USAGE_MODE === "demo")  {
    avatarUrl = patient.avatar_url || (patient.email && gravatar(patient.email));
  } else if (patient) {
    avatarUrl = patient.avatar_url;
  }

  const CarePlans = carePlan
    ? <ArrowLink copy={carePlan.name} url={"/care_plans"}/>
      : (
        <Typography
          variant="subtitle"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 1,
            alignItems: "center",
            fontSize: "20px",
            marginTop: "0.25rem",
          }}
        >
          No active care plans
        </Typography>
      )

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        boxShadow: !carePlan ? ["rgb(2 2 40 / 8%) 0px 4px 6px"] : null,
      }}>
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
    const NoCarePlanCard = ({text, textColor, left, top}) => (
      <Card
        sx={{
          width: "50%",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgb(177 179 203 / 80%)",
          textAlign: "left",
          position: "absolute",
          left,
          top,
        }}
      >
        <Typography variant="eyebrow" style={{ color: textColor }}>{text}</Typography>
        <Skeleton animation={false} height={"0.5rem"} width={"75%"} sx={{ backgroundColor: "#D9DBE9" }} />
        <Skeleton animation={false} height={"0.5rem"} sx={{ backgroundColor: "#EFF0F7" }} />
        <Skeleton animation={false} height={"0.5rem"} width={"80%"} sx={{ backgroundColor: "#EFF0F7" }} />
      </Card>
    );
    return (
      <div style={{ padding: "3rem 36px 36px", textAlign: "center" }}>
        <div style={{ position: "relative", height: "125px" }}>
          <NoCarePlanCard text={"Recommended goal"} textColor={"#4C4CD8"} left={"20%"} top={"0"} />
          <NoCarePlanCard text={"Recommended task"} textColor={"#F8BE39"} left={"35%"} top={"30%"} />
        </div>
        <div style={{ position: "relative" }}>
          <Typography variant="body2">
            A Care Plan is your action plan tailored to help you achieve your health goals. As your Care Team gets to know you, you will see what they recommend and assign to you here.
          </Typography>
        </div>
      </div>
    );
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
  const { currentPatient } = useCurrentPatient();
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
      <Header carePlan={currentCarePlan} patient={currentPatient} />
      <HomeContent carePlan={currentCarePlan} />
    </>
  );
}
