import { Box, Typography } from "@mui/material";
import { Message as TwilioMessage } from "@twilio/conversations";
import { format } from "date-fns";
import { User } from "models/users/User.types";
import { displayName } from "utils/strings";
import MessageBody from "./MessageBody";

const Message = ({
  author,
  message,
  sentByMe,
}: {
  author: User;
  message: TwilioMessage;
  sentByMe: boolean;
}) => {
  const backgroundColor = sentByMe ? "primary.light" : "grey.300";
  const authorName = sentByMe
    ? "You"
    : author
    ? displayName(author)
    : process.env.REACT_APP_SENDER_NAME || "Care Team";

  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        borderRadius: "0.3rem",
        backgroundColor,
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "grey.900",
            fontWeight: 500,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {authorName}
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "grey.700",
          }}
        >
          {format(message.dateCreated, "MMM d, yyyy h:mmaaa")}
        </Typography>
      </Box>
      <MessageBody message={message} />
    </Box>
  );
};

export default Message;
