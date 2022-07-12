import { useState } from "react";
import { Box, Button, Input, InputLabel, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";

// Renders the input field which submits a message to a conversation.
function MessageInput({ conversation }) {
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = (event) => {
    event.preventDefault();
    const message = newMessage;
    setNewMessage("");
    conversation.sendMessage(message);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={sendMessage}
      sx={{
        display: "flex",
        backgroundColor: "light.main",
        borderLeft: "1px solid grey",
        width: "100%",
      }}
    >
      <TextField
        variant="standard"
        required
        onChange={(event) => setNewMessage(event.target.value)}
        value={newMessage}
        placeholder="Send a message to Dr. Potapova"
        fullWidth
        multiline={true}
        maxRows={2}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          sx: {
            paddingY: "0.5rem",
            paddingX: "0.7rem",
            fontSize: "0.9rem",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          sx={{
            backgroundColor: newMessage ? "primary.main" : "light.main",
            margin: "0.3rem",
            "&.MuiButtonBase-root:hover": {
              backgroundColor: newMessage ? "primary.main" : "light.main",
            },
          }}
        >
          <SendIcon sx={{ color: newMessage ? "light.main" : "grey.700" }} />
        </Button>
      </Box>
    </Box>
  );
}

// Renders a image upload button which submits the image to a conversation.
function ImageUpload({ conversation }) {
  // Function that is called when the user uploads a file.
  const onUpload = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    conversation.sendMessage(formData);

    // Reset the files list.
    const list = new DataTransfer();
    event.target.files = list.files;
  };

  return (
    <InputLabel
      htmlFor="file-upload-button"
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Input
        accept="image/*"
        id="file-upload-button"
        type="file"
        sx={{ display: "none" }}
        onChange={onUpload}
      />
      <Button color="primary" aria-label="upload picture" component="span">
        <PanoramaOutlinedIcon sx={{ color: "grey.700" }} />
      </Button>
    </InputLabel>
  );
}

// Renders the inputs for chat.
//   1. an image upload input.
//   2. a text input.
function ConversationInput({ conversation }) {
  return (
    <Box
      sx={{
        flex: "0 1 auto",
        display: "flex",
        borderTop: "1px solid grey",
        zIndex: 2,
      }}
    >
      <ImageUpload conversation={conversation} />
      <MessageInput conversation={conversation} />
    </Box>
  );
}

export default ConversationInput;
