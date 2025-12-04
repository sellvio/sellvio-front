import Channels from "../primitives/Channels";
import GeneralChat from "../primitives/GeneralChat";

const Chat = () => {
  return (
    <div className="min-h-screen flex">
      <Channels />
      <GeneralChat />
    </div>
  );
};

export default Chat;
