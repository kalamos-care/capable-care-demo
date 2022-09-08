import { Link, Typography, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ForwardArrowIcon } from "./icons";

const ArrowLink = ({ copy, url }) => {
  const navigate = useNavigate();
  return (
    <Link onClick={() => navigate(url)} underline="none" component="button">
      <Typography
        variant="headline"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
          alignItems: "center",
        }}
      >
        {copy || <Skeleton animation="wave" width="100%" />}
        <ForwardArrowIcon />
      </Typography>
    </Link>
  );
};

export default ArrowLink;
