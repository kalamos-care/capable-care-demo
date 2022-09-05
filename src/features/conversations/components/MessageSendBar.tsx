import { CSSProperties, useState } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

import { colors } from "styles/colors";
import { IconButton } from "@mui/material";

const MessageSendBar = ({
  onSend,
  messagePlaceholder,
  sendDisabled,
  typingDisabled,
  sx,
}: {
  onSend: (message: string) => void;
  messagePlaceholder?: string;
  sendDisabled?: boolean;
  typingDisabled?: boolean;
  sx?: CSSProperties;
}) => {
  const [typedMessage, setTypedMessage] = useState<string>("");

  const typedMessageIsValid = Boolean(typedMessage.trim());

  const handleSend = () => {
    if (typedMessageIsValid) {
      setTypedMessage("");
      onSend(typedMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "end",
        alignContent: "center",
        justifyContent: "space-around",
        width: "100%",
        borderTop: 1,
        borderColor: colors.lightGrey3,
        padding: (theme) => theme.spacing(1, 1),
        ...sx,
      }}
    >
      <TextField
        value={typedMessage}
        onChange={(e) => {
          setTypedMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={messagePlaceholder}
        sx={{
          marginRight: (theme) => theme.spacing(1),
          flexGrow: 1,
        }}
        multiline
        maxRows={4}
        disabled={typingDisabled}
        inputProps={{ maxLength: 1600 }}
        InputProps={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      <IconButton
        onClick={handleSend}
        disabled={sendDisabled || !typedMessageIsValid}
        style={{
          whiteSpace: "nowrap",
          alignSelf: "end",
          width: "30px",
          minWidth: 0,
        }}
        sx={{
          paddingBottom: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(2),
          marginLeft: (theme) => theme.spacing(2),
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageSendBar;
