import Channels from '../primitives/Channels';
import GeneralChat from '../primitives/GeneralChat';

const Chat = () => {
  return (
    <div className="flex m-auto w-full max-w-[1440px] min-h-screen">
      <Channels />
      <GeneralChat />
    </div>
  );
};

export default Chat;
