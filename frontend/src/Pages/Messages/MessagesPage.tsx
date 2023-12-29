import Chat from "./Chat";
import MessagesNavBar from "./MessagesNavBar";

const MessagesPage = () => {
  return (
    <div className="flex w-full h-full px-6">
      <MessagesNavBar />
      <Chat />
    </div>
  );
};
export default MessagesPage;
