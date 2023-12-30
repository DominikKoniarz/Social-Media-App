import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <div className="relative flex flex-col w-full">
      <ChatHeader />
      <ChatFooter />
    </div>
  );
};
export default Chat;
