import { CardMedia } from "@mui/material";

// Renders an image.
// The data object passed in should have an imageUrl and name property.
// Example: <HeaderImage data={goal} />
// Example: <HeaderImage data={currentPlan} />
export default function HeaderImage({ data }) {
  // use a backup image if not available on the data object.
  const headerImage = data.imageUrl;

  if (!headerImage) {
    return null;
  }
  // Note: we are relying on a naming convention in this app to determine
  // whether this is an image or a video.
  const headerIsVideo = /\/\/videos/.test(data.imageUrl);
  const media = headerIsVideo ? "video" : "img";

  return (
    <CardMedia
      sx={{ objectFit: "cover", height: "300px" }}
      component={media}
      width="375"
      src={headerImage}
      alt={data.name}
      autoPlay={headerIsVideo}
      loop={headerIsVideo}
    />
  );
}
