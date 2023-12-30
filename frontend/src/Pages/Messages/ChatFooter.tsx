import MessageInput from "./MessageInput";
import { useState } from "react";
import Microphone from "./Microphone";
import Send from "./Send";

const ChatFooter = () => {
  const [message, setMessage] = useState<string>("");
  return (
    <div className="absolute bottom-0 flex flex-col w-full gap-1 h-fit">
      <div className="w-full px-4 py-4 bg-white rounded-t-xl h-fit">
        <MessageInput message={message} setMessage={setMessage} />
      </div>
      <div className="relative w-full px-4 py-2 text-gray-500 bg-white rounded-b-xl h-fit">
        <Microphone />
        <Send />
      </div>
    </div>
  );
};
export default ChatFooter;
