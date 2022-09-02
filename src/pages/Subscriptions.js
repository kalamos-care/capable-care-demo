import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { Heading } from "@aws-amplify/ui-react";

const SubscriptionHeader = () => (
  <Box sx={{ backgroundColor: "background.paper" }}>
    <CardMedia
      component="img"
      width="375"
      image={process.env.REACT_APP_LOGO}
      alt="Logo image"
    />
  </Box>
);

export const Subscriptions = () => {
  return (
    <Box sx={{ backgroundColor: "background.paper", height: "100%" }}>
      <SubscriptionHeader />
      <Box
        sx={{
          textAlign: "center",
          padding: "8rem 1rem",
        }}
      >
        <Heading level={5}>Subscription needed</Heading>
        <Typography variant="h6" sx={{ paddingTop: "1rem" }}>
          Sorry, this account does not have a subscription. Please contact
          support for help.
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscriptions;
