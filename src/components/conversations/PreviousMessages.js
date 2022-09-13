import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Linkify from "react-linkify";
import { Box, Link, ListItem, Skeleton, Typography } from "@mui/material";
import useCurrentPatient from "../../fetchDataHooks/useCurrentPatient";

// Renders the time the message was sent.
function formatTime(dateTime) {
  return dateTime
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .replace("AM", "am")
    .replace("PM", "pm");
}

// Renders the message content, either text or a image.
function MessageBody({ message }) {
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(async () => {
    if (message.type === "media") {
      setIsImage(true);
      const url = await message.media.getContentTemporaryUrl();
      setImageUrl(url);
    }
  }, []);

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
            {decoratedText.match("daily.co") ? "Join video chat" : decoratedText}
          </Link>
        )}
      >
        {message.body}
      </Linkify>
    </Typography>
  );
}

// Renders a message.
function MessageBox({ message }) {
  const { currentPatient } = useCurrentPatient();

  // For now the Practitioner name is hardcode.
  let author = "Dr. Lauren Potapova";
  let backgroundColor = "grey.300";
  if (message.author.includes(currentPatient.id)) {
    author = "You";
    backgroundColor = "primary.light";
  }

  return (
    <ListItem alignItems={"flex-start"}>
      <Box
        sx={{
          padding: "1rem",
          width: 1,
          borderRadius: "0.3rem",
          backgroundColor,
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "grey.900",
              fontWeight: 500,
            }}
          >
            {author}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "grey.700",
            }}
          >
            {formatTime(message.dateCreated)}
          </Typography>
        </Box>
        <MessageBody message={message} />
      </Box>
    </ListItem>
  );
}

// Renders a placeholder while the app fetches more messages
function FetchingMore() {
  return (
    <Typography
      align="center"
      sx={{
        margin: "1rem",
        color: "grey.700",
      }}
    >
      Fetching more messages....
    </Typography>
  );
}

// Renders a scrollable box which contains all the previous messages.
function PreviousMessages({
  messages,
  user,
  loadMoreMessages,
  moreMessagesToLoad,
  scrollableContainerRef,
}) {
  return (
    <Box
      id="scrollableContainer"
      ref={scrollableContainerRef}
      sx={{
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        scrollBehavior: "smooth",
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={loadMoreMessages}
        hasMore={moreMessagesToLoad}
        loader={<FetchingMore />}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "hidden",
        }}
        inverse={true}
        scrollableTarget="scrollableContainer"
        scrollThreshold="50px"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {messages.map((message) => (
            <MessageBox key={message.sid} message={message} user={user} />
          ))}
        </div>
      </InfiniteScroll>
    </Box>
  );
}

export default PreviousMessages;
