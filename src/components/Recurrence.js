import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Typography } from "@mui/material";

// Small helper method to humanize the cron_expression
const recurrenceString = (cron_expression) =>
  `repeats ${cron_expression.substring(1)}`;

// Renders the recurrence with an clock icon.
const Recurrence = ({ cron_expression }) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 0.5, marginTop: "0.5rem" }}>
        <AccessTimeIcon fontSize="1rem" color="black" />
        <Typography
          variant="eyebrow"
          sx={{ fontWeight: 300, marginTop: "auto", marginBottom: "auto" }}
        >
          {recurrenceString(cron_expression)}
        </Typography>
      </Box>
    </>
  );
};

export default Recurrence;
