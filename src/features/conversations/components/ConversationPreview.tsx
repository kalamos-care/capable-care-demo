import { Conversation, Message } from "@twilio/conversations";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

import { BarnardConversation } from "models/conversations/BarnardConversation.types";
import { colors } from "styles/colors";
import { displayName } from "utils/strings";
import { ForwardArrowIcon } from "components/icons";
import { getMessageDateLabel } from "utils/dates";
import { useCurrentPatient } from "fetchDataHooks";
import { User } from "models/users/User.types";
import Avatar from "components/Avatar";

export const ConversationPreview = ({
  twilioConversation,
  barnardConversation,
  lastMessage,
  participants,
  top,
}: {
  twilioConversation: Conversation;
  barnardConversation: BarnardConversation;
  lastMessage: Message;
  participants: Record<string, User>;
  top?: boolean;
  bottom?: boolean;
}) => {
  const { currentPatient } = useCurrentPatient();

  const author = participants[lastMessage.author];
  const sentByMe =
    lastMessage.author === currentPatient?.email ||
    lastMessage.author === `${currentPatient?.id}@capable-chat.com`;

  const authorName = sentByMe
    ? "You"
    : author
    ? displayName(author)
    : process.env.REACT_APP_SENDER_NAME || "Care Team";

  return (
    <Link
      to={`/chat/${barnardConversation.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingY: (theme) => theme.spacing(2),
          borderTop: top ? 1 : 0,
          borderBottom: 1,
          borderColor: colors.lightGrey5,
          backgroundColor: colors.white,
          color: colors.darkGrey,
          ":hover": { backgroundColor: colors.lightGrey1, cursor: "pointer" },
          width: "100%",
        }}
        key={twilioConversation.sid}
      >
        <Box
          sx={{
            width: "50px",
            padding: (theme) => theme.spacing(1),
          }}
        >
          <Avatar user={author} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            padding: (theme) => theme.spacing(1),
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "nowrap",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: (theme) => theme.spacing(2),
                flexBasis: "content",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {authorName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: (theme) => theme.spacing(1),
              }}
            >
              <Typography>
                {getMessageDateLabel(lastMessage.dateCreated)}
              </Typography>
              <ForwardArrowIcon />
            </Box>
          </Box>
          {twilioConversation.friendlyName && (
            <Typography
              sx={{
                marginRight: (theme) => theme.spacing(1),
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {twilioConversation.friendlyName}
            </Typography>
          )}
          <Typography
            sx={{
              fontWeight: "400",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {lastMessage.type === "text"
              ? lastMessage.body
              : `${authorName} sent media`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};
