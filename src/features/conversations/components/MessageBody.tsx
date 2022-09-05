import { Box, Skeleton, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import Linkify from "react-linkify";

const MessageBody = ({ message }) => {
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    (async () => {
      if (message.type === "media") {
        setIsImage(true);
        const url = await message.media.getContentTemporaryUrl();
        setImageUrl(url);
      }
    })();
  }, [message.media, message.type]);

  if (imageUrl) {
    return (
      <Box
        component="img"
        sx={{
          objectFit: "contain",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "0.2rem",
          borderRadius: "0.3rem",
        }}
        src={imageUrl}
      />
    );
  }

  if (isImage) {
    return (
      <Skeleton
        variant="rectangular"
        height="8rem"
        animation="wave"
        sx={{ margin: "0.2rem", borderRadius: "0.3rem" }}
      />
    );
  }

  return (
    <Typography sx={{ overflowWrap: "break-word" }}>
      {/* Using linkify to detect links in the message and turn them into <a> tags */}
      {/* componentDecorator: https://github.com/tasti/react-linkify/issues/96#issuecomment-628472955 */}
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <Link target="_blank" rel="noopener" href={decoratedHref} key={key}>
            {decoratedText.match("daily.co")
              ? "Join video chat"
              : decoratedText}
          </Link>
        )}
      >
        {message.body}
      </Linkify>
    </Typography>
  );
};

export default MessageBody;
