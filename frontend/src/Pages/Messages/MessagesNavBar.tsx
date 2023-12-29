import { useState } from "react";
import SearchInput from "./SearchInput";

const MessagesNavBar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="max-w-[371px] flex flex-col p-6 bg-white">
      <p>Messages</p>
      <SearchInput search={search} setSearch={setSearch} />
    </div>
  );
};
export default MessagesNavBar;
