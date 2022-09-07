import { Avatar as MUIAvatar } from "@mui/material";

import { colors } from "styles/colors";
import { getInitials } from "utils/strings";

const Avatar = ({
  user,
  color,
  diameter,
  style,
  imageUrl,
}: {
  user?: any;
  color?: string;
  diameter?: string;
  style?: any;
  imageUrl?: string;
}): JSX.Element => {
  const initials = user
    ? getInitials(user.first_name, user.last_name) || undefined
    : undefined;
  const imageSrc = imageUrl ?? user?.avatar_url ?? "";

  return (
    <MUIAvatar
      src={imageSrc}
      sx={{
        border: "1px solid",
        borderColor: color || colors.avatarBlue,
        backgroundColor: color || colors.avatarBlue,
        fontWeight: "bold",
        height: diameter ? diameter : "42px",
        width: diameter ? diameter : "42px",
        color: colors.white,
        fontSize: "16px",
        ...style,
      }}
    >
      {initials?.toUpperCase()}
    </MUIAvatar>
  );
};

export default Avatar;
