import { Button, Input, InputLabel } from "@mui/material";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";

const ImageUpload = ({ conversation }) => {
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
};

export default ImageUpload;
