import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia, Container, Avatar, Link, Skeleton, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";

import {
  DetailsCard,
  ControlledTabs,
  GoalCards,
  NoDataCards,
  TaskCards,
} from "components";
import { useCarePlans, useCurrentPatient } from "fetchDataHooks/index";
import { CurrentPatient } from "fetchDataHooks/useCurrentPatient";
import gravatar from "utils/gravatar";
import { carePlanAtom } from "../atoms";
import { CarePlan } from "models/index.types";

const Header = ({ carePlan, patient }: { carePlan?: CarePlan, patient: CurrentPatient }) => {
  const navigate = useNavigate();

  // Ignoring any errors because it's just for the avatar URL / email
  // and we'll be graceful about it.
  const firstName = patient?.name;

  let avatarUrl;
  if (patient && process.env.REACT_APP_USAGE_MODE === "demo") {
    avatarUrl = patient.avatar_url || (patient.email && gravatar(patient.email));
  } else if (patient) {
    avatarUrl = patient.avatar_url;
  }

  const CarePlans = carePlan
    ? (
        <Link
          onClick={() => navigate("/care_plans")}
          underline="none"
          component="button"
          sx={{
            alignItems: "baseline",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Typography
            variant="headline"
            sx={{
              flexGrow: 1,
              display: "flex",
              textAlign: "left",
            }}
          >
            {carePlan.name}
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              minWidth: "fit-content",
              textDecoration: "underline",
            }}
          >
            See all
          </Typography>
        </Link>
      )
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
};

const getCarePlanTabs = (carePlan: CarePlan) => {
  const tabOrder = process.env.REACT_APP_HOME_TAB_ORDER ?
    process.env.REACT_APP_HOME_TAB_ORDER.split(',').map((tabName) => tabName.toLowerCase().trim()) :
    ["tasks", "goals", "detais"]
  return tabOrder.map((tabName) => {
    let to;
    switch (tabName) {
      case "tasks":
        to = `/home/${carePlan.id}/tasks`;
        return {
          title: "Tasks",
          content: <TaskCards carePlan={carePlan}/>,
          to
        };
      case "goals":
        to = `/home/${carePlan.id}/goals`;
        return {
          title: "Goals",
          content: <GoalCards carePlan={carePlan} />,
          to
        };
      case "details":
      default:
        to = `/home/${carePlan.id}/details`;
        return {
          title: "Details",
          content: <DetailsCard carePlan={carePlan} />,
          to
        };
    };
  });
};

const HomeContent = ({ carePlan }: { carePlan?: CarePlan }) => {
  const tabs = carePlan ? getCarePlanTabs(carePlan) : [];

  const { subPage } = useParams();
  const defaultTab = tabs.find((tab) => tab.title.toLowerCase() === subPage) || tabs[0];

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
      handleTabChange={(_event: React.SyntheticEvent<Element, Event>, tabTitle: string) => {
        const tab = tabs.find((tab) => tab.title === tabTitle);
        setTab(tab!);
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
