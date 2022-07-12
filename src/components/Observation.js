import { Box, Typography } from "@mui/material";
import { ThumbsEmoji, WellnessEmoji } from ".";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UtcDateToUsDateFormat } from "../utils/dates";
// e.g findOneTagByType(['type:wellness'], 'type') => 'wellness'.
const findOneTagByType = (tags, type) => {
  const tag = tags.find((tag) => tag.split(":")[0].trim() == type);
  const tagValue = tag?.split(":")[1].trim();
  return tagValue;
};

function ObservationEmoji({ value, type }) {
  switch (type) {
    case "wellness":
      return <WellnessEmoji value={value} />;
    case "thumbs":
      return <ThumbsEmoji value={value} />;
    default:
      console.warn(`ObservationEmoji type "${type}" is not recognized`);
      break;
  }
  return <></>;
}

function ObservationCopy(props) {
  return (
    <Typography
      color="grey.900"
      variant="h7"
      textAlign="right"
      width="50%"
      {...props}
    />
  );
}

// Display the observed value as a string or as an emoji depending on target type.
function ObservedValue({ target, observation }) {
  // Show a relevant emoji for targets with 'type:wellness' or 'type:thumbs' tags.
  const targetType = findOneTagByType(target.tag_list, "type");
  if (targetType) {
    return (
      <ObservationEmoji value={observation.observed_value} type={targetType} />
    );
  }

  // If there's no 'type' tag then show the observation as copy.
  let copy = `${observation.observed_value} ${target.name.toLowerCase()}`;
  // The Capable API returns 't' as true and 'f' as false.
  // Format booleans as yes/no for the UI.
  if (target.data_type === "boolean") {
    copy = observation.observed_value === "t" ? "Yes" : "No";
  }
  return <ObservationCopy target={target}>{copy}</ObservationCopy>;
}

function DatetimeObservation({ observation }) {
  const observedValue = new Date(observation.observed_value).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <Box
      color="grey.900"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginX: "1rem",
      }}
    >
      <CalendarMonthIcon fontSize="small" sx={{ marginRight: 2 }} />
      <Typography color="grey.900" variant="h7">
        {observedValue}
      </Typography>
    </Box>
  );
}

export default function Observation({ target, observation }) {
  if (!observation || !target) {
    return <></>;
  }

  // Render a slightly different component if the observed_value is a dateTime
  if (observation.data_type == "datetime" || target.name == "DateTime") {
    return <DatetimeObservation observation={observation} />;
  }

  const observationDate = UtcDateToUsDateFormat(observation.observed_date);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box color="grey.900" sx={{ display: "flex", alignItems: "center" }}>
        <CalendarMonthIcon
          color="grey.900"
          fontSize="small"
          sx={{ marginRight: 2 }}
        />

        <Typography color="grey.900" variant="h7">
          {observationDate}
        </Typography>
      </Box>

      <ObservedValue observation={observation} target={target} />
    </Box>
  );
}
