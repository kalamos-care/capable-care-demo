import { useCurrentPatient } from "../fetchDataHooks";
import { CurrentCarePlan, TabsWithContent } from "../components";

import { Container, Typography, Box, CardMedia, Avatar } from "@mui/material";

import gravatar from "../utils/gravatar";

function Header() {
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

        <CurrentCarePlan />
      </Container>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <TabsWithContent />
    </>
  );
}
