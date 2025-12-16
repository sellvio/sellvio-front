import ChatHeader from '../../../components/composites/ChatHeader';
import Channels from '../primitives/Channels';
import GeneralChat from '../primitives/GeneralChat';

const Chat = () => {
  return (
    <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
      <ChatHeader />
      <div className="flex rounded-[10px] overflow-hidden">
        <Channels />
        <GeneralChat />
      </div>
    </div>
  );
};

export default Chat;
