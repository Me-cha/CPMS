import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

// This component is used allows users to join or create a video conference  just need to call thid function
export const VideoConference = ({ roomName, displayName }) => {
  return (
    <JitsiMeeting
      roomName={roomName}
      domain="meet.jit.si"
      configOverwrite={{ startWithAudioMuted: true }}
      interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }}
      userInfo={{ displayName: displayName }}
      onApiReady={(externalApi) => {
        console.log("API is ready");
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "600px"; //height ko adjust kr kaisa kitna UI me dikhne ko hona
      }}
    />
  );
};
