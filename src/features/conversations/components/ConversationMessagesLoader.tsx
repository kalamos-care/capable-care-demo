import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useMemo } from "react";
import { colors } from "styles/colors";

export const ConversationMessagesLoader = () => {
  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        display: "flex",
        flexDirection: "column",
        marginLeft: (theme) => theme.spacing(1),
        marginRight: (theme) => theme.spacing(3),
        marginBottom: (theme) => theme.spacing(1),
        overflowY: "hidden",
      }}
    >
      {[...Array(7)].map((_e, i) => (
        <MessageSkeleton key={i} />
      ))}
    </Box>
  );
};

const MessageSkeleton = () => {
  const randomHeight = useMemo(() => Math.floor(Math.random() * 50) + 50, []);
  const randomTitleWidth = useMemo(
    () => Math.floor(Math.random() * 50) + 50,
    []
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: (theme) => theme.spacing(2, 0),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75px",
          flexShrink: 0,
        }}
      >
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      </Box>
      <Box
        sx={{
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.lightGrey6,
          width: "400px",
          padding: (theme) => theme.spacing(1),
          flexGrow: 1,
        }}
      >
        <Skeleton animation="wave" height={10} width={`${randomTitleWidth}%`} />
        <Skeleton animation="wave" height={randomHeight} width="100%" />
      </Box>
    </Box>
  );
};
