import { useCurrentPatient } from "../fetchDataHooks";
import { CurrentCarePlan, TabsWithContent } from "../components";

import { Container, Typography, Box, CardMedia, Avatar } from "@mui/material";

import header_logo from "../assets/images/Kalamos_logo_transparent.png";
import gravatar from "../utils/gravatar";

function Header() {
  // Ignoring any errors because it's just for the avatar URL / email
  // and we'll be graceful about it.
  const { currentPatient } = useCurrentPatient();
  const firstName = currentPatient?.name;

  let avatarUrl;
  if (currentPatient) {
    avatarUrl =
      currentPatient.avatar_url ||
      (currentPatient.email && gravatar(currentPatient.email));
  }

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <CardMedia
        component="img"
        width="375"
        image={header_logo}
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
