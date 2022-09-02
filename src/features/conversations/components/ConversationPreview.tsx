import { Conversation, Message } from "@twilio/conversations";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

import {
  BarnardConversation,
  ConversationType,
} from "models/conversations/BarnardConversation.types";
import { colors } from "styles/colors";
import { displayName } from "utils/strings";
import { ForwardArrowIcon } from "components/icons";
import { User } from "models/users/User.types";
import Avatar from "components/Avatar";

export const ConversationPreview = ({
  twilioConversation,
  barnardConversation,
  conversationType,
  lastMessage,
  participants,
  top,
}: {
  twilioConversation: Conversation;
  barnardConversation: BarnardConversation;
  conversationType: ConversationType;
  lastMessage: Message;
  participants: Record<string, User>;
  top?: boolean;
  bottom?: boolean;
}) => {
  const { id } = useParams<{ id: string }>();
  const author = participants[lastMessage.author];
  const authorName = author
    ? displayName(author)
    : process.env.REACT_APP_SENDER_NAME || "Care Team";

  return (
    <Link
      to={`/patients/${id}/conversations/${conversationType}/${barnardConversation.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                minWidth: 0,
              }}
            >
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
              {twilioConversation.friendlyName && (
                <Typography sx={{ marginX: (theme) => theme.spacing(1) }}>
                  •
                </Typography>
              )}
              <Typography
                sx={{
                  marginRight: (theme) => theme.spacing(2),
                  flexBasis: "content",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                {authorName}
              </Typography>
            </Box>
            <Box>
              <ForwardArrowIcon />
            </Box>
          </Box>
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
