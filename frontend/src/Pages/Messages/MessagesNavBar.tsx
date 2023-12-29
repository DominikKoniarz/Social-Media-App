import { useState } from "react";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

const MessagesNavBar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="max-w-[371px] flex flex-col  bg-white">
      <p className="px-6 pt-6 pb-4 text-2xl font-bold text-zinc-900 font-family2">
        Messages
      </p>
      <SearchInput search={search} setSearch={setSearch} />
      <UserList />
    </div>
  );
};
export default MessagesNavBar;
