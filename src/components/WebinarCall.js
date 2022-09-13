import React, { useRef, useEffect, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import { Box } from "@mui/material";

const CALL_OPTIONS = {
  // NOTE: The width of this app is set to 375px for demo.
  // This css is for lining up the webinar iframe over the app body.
  iframeStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    width: "375px",
    height: "100%",
  },
  showLeaveButton: true,
  showFullscreenButton: true,
};

// This component is for making web calls using https://www.daily.co/
// See the entire tutorial for setting up here:
// https://www.daily.co/blog/webinartc-build-your-own-webinar-app/
const WebinarCall = ({ callUrl, onLeave }) => {
  const videoRef = useRef(null);
  const [callframe, setCallframe] = useState(null);

  useEffect(() => {
    if (!videoRef || !videoRef.current || callframe) return;
    CALL_OPTIONS.url = callUrl;

    const newCallframe = DailyIframe.createFrame(videoRef.current, CALL_OPTIONS);

    // you can customize how your app responds to Daily events
    // using callback functions. https://docs.daily.co/reference/daily-js/events
    if (onLeave) {
      newCallframe.on("left-meeting", (_event) => {
        onLeave();
      });
    }

    newCallframe.join().then(() => {
      setCallframe(newCallframe);
    });
  }, [videoRef]);

  return (
    <Box sx={{ margin: "auto", marginBottom: 3 }}>
      <Box ref={videoRef} sx={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default WebinarCall;
