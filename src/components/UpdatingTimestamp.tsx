import { Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

import { getMessageTimestampLabel } from "utils/dates";

const UpdatingTimestamp = ({
  time,
  autoUpdateInterval = 60000,
  convertToLabel = getMessageTimestampLabel,
  style,
}: {
  time: any;
  autoUpdateInterval?: number;
  convertToLabel?: (time: any) => string;
  style?: CSSProperties;
}): JSX.Element => {
  const [updatedTime, setUpdatedTime] = useState(convertToLabel(time));

  useEffect(() => {
    const repeatingTimer = setInterval(() => {
      setUpdatedTime(convertToLabel(time));
    }, autoUpdateInterval);

    return () => {
      clearInterval(repeatingTimer);
    };
  }, [convertToLabel, autoUpdateInterval, time]);

  return <Typography sx={{ fontSize: "12px", ...style }}>{updatedTime}</Typography>;
};

export default UpdatingTimestamp;
