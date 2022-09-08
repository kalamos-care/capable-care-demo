import * as React from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "./icons/HomeIcon";
import ChatIcon from "./icons/ChatIcon";
import ProfileIcon from "./icons/ProfileIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Navigation() {
  const [value, setValue] = React.useState("/");
  let navigate = useNavigate();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: "grey.400",
        padding: "10px 0",
        height: "auto",
        backgroundColor: "#fafafa",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        showLabel
        label="Home"
        value="/"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        showLabel
        label="Chat"
        value="chat"
        icon={<ChatIcon sx={{ color: "#333333" }} />}
      />

      <BottomNavigationAction
        showLabel
        label="Appointments"
        value="appointments"
        icon={<CalendarMonthIcon color="secondary" />}
      />

      <BottomNavigationAction
        showLabel
        label="Profile"
        value="profile"
        icon={<ProfileIcon />}
      />
    </BottomNavigation>
  );
}
