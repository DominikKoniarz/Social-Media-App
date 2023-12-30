import UserMessage from "./UserMessage";
import YourMessage from "./YourMessage";

const ChatBody = () => {
  return (
    <ul className="relative w-full px-4 space-y-16 overflow-y-auto chat h-fit">
      <UserMessage />
      <YourMessage />
      <UserMessage />
      <YourMessage />
      <UserMessage />
      <YourMessage />
      <UserMessage />
      <YourMessage />
      <UserMessage />
      <YourMessage />
      <UserMessage />
      <YourMessage />
    </ul>
  );
};
export default ChatBody;
