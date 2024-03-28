import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useLocation } from "react-router-dom";

// This component is used allows users to join or create a video conference  just need to call thid function
export const VideoConference = () => {
  const location = useLocation();
  const { Title, Host } = location.state;

  return (
    <JitsiMeeting
      roomName={Title}
      userInfo={{ displayName: Host }}
      domain="meet.jit.si"
      configOverwrite={{ startWithAudioMuted: true }}
      interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }}
      onApiReady={(externalApi) => {
        console.log("API is ready");
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "600px";
      }}
    />
  );
};
