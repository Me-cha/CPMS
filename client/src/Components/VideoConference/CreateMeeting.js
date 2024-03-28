import { VideoConference } from "./VideoConference";

export const CreateMeeting = () => {
  return (
    <div>
      <h2>Join Our Video Conference</h2>
      <VideoConference roomName="MyUniqueRoomName" displayName="John Doe" />
    </div>
  );
};
