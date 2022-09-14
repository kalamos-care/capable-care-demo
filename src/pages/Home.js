import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  Container,
  Avatar,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";

import {
  AboutCard,
  ArrowLink,
  ControlledTabs,
  GoalCards,
  NoDataCards,
  TaskCards,
} from "../components";
import { useCarePlans, useCurrentPatient } from "../fetchDataHooks";
import gravatar from "../utils/gravatar";
import { carePlanAtom } from "../atoms";

function Header({ carePlan, patient }) {
  // Ignoring any errors because it's just for the avatar URL / email
  // and we'll be graceful about it.
  const firstName = patient?.name;

  let avatarUrl;
  if (patient && process.env.REACT_APP_USAGE_MODE === "demo") {
    avatarUrl = patient.avatar_url || (patient.email && gravatar(patient.email));
  } else if (patient) {
    avatarUrl = patient.avatar_url;
  }

  const CarePlans = carePlan ? (
    <ArrowLink copy={carePlan.name} url={"/care_plans"} />
  ) : (
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
  );

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        boxShadow: !carePlan ? ["rgb(2 2 40 / 8%) 0px 4px 6px"] : null,
      }}
    >
      <CardMedia component="img" width="375" image={process.env.REACT_APP_LOGO} alt="Logo image" />

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
        <Typography sx={{ marginBottom: "1rem" }} color="primary" variant="h6" component="h1">
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
      title: "Tasks",
      content: <TaskCards carePlan={carePlan} />,
      to: `/home/${carePlan?.id}/tasks`,
    },
    {
      title: "Goals",
      content: <GoalCards carePlan={carePlan} />,
      to: `/home/${carePlan?.id}/goals`,
    },
    {
      title: "About",
      content: <AboutCard carePlan={carePlan} />,
      to: `/home/${carePlan?.id}/about`,
    },
  ];

  const { subPage } = useParams();
  const defaultTab = tabs.find(tab => tab.title.toLowerCase() === subPage) || tabs[0];

  const [tab, setTab] = useState(defaultTab);
  
  if (!carePlan) {
    return (
      <NoDataCards
        firstText={"Recommended goal"}
        secondText={"Recommended task"}
        body={
          "A Care Plan is your action plan tailored to help you achieve your health goals. As your Care Team gets to know you, you will see what they recommend and assign to you here."
        }
      />
    );
  }

  return (
    <ControlledTabs
      tabs={tabs}
      tab={tab}
      handleTabChange={(_, tabTitle) => {
        const tab = tabs.find((tab) => tab.title === tabTitle);
        setTab(tab);
      }}
    />
  );
};

export default function Home() {
  const { currentPatient } = useCurrentPatient();
  const { carePlans, isLoading, isError } = useCarePlans();
  const { carePlanId } = useParams();
  const [carePlan, setCarePlan] = useAtom(carePlanAtom);

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isError) {
    return <div>Woops something went wrong...</div>;
  }

  let currentCarePlan;
  const activeCarePlans = carePlans.filter((carePlan) => carePlan.status === "active");
  const completedCarePlans = carePlans.filter((carePlan) => carePlan.status === "completed");

  if (carePlanId) {
    currentCarePlan = [...activeCarePlans, ...completedCarePlans].find(
      (carePlan) => carePlan.id === carePlanId
    );

    setCarePlan(currentCarePlan);
  } else if (!carePlan) {
    if (activeCarePlans.length > 0) {
      currentCarePlan = activeCarePlans[0];
    } else if (completedCarePlans.length > 0) {
      currentCarePlan = completedCarePlans[0];
    }

    setCarePlan(currentCarePlan);
  }  

  return (
    <>
      <Header carePlan={carePlan} patient={currentPatient} />
      <HomeContent carePlan={carePlan} />
    </>
  );
}
