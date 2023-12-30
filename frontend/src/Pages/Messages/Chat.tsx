import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <div className="relative flex flex-col w-full">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};
export default Chat;
