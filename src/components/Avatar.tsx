import Box from "@mui/material/Box";

import { colors } from "styles/colors";
import { getInitials } from "utils/strings";

const Avatar = ({
  user,
  color,
  diameter,
  style,
}: {
  user?: any;
  color?: string;
  diameter?: string;
  style?: any;
  imageUrl?: string;
}): JSX.Element => {
  const initials = user ? getInitials(user.first_name, user.last_name) : "";
  const imageUrl = user?.avatar_url || "";

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: color || colors.avatarBlue,
        backgroundColor: color || colors.avatarBlue,
        fontWeight: "bold",
        height: diameter ? diameter : "42px",
        width: diameter ? diameter : "42px",
        borderRadius: "50%",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        color: colors.white,
        ...style,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt={""}
        />
      ) : (
        initials?.toUpperCase()
      )}
    </Box>
  );
};

export default Avatar;
