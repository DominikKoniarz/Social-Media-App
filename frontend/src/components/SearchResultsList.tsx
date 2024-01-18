import { useEffect, useState } from "react";
import { UserData } from "../../../types/socket.io";
import useSocketContext from "hooks/useSocketContext";
import SearchListItem from "./SearchListItem";

type Props = {
  search: string;
};

export default function SearchResultsList({ search }: Props) {
  const { socket } = useSocketContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [foundUsers, setFoundUsers] = useState<
    Pick<
      UserData,
      "firstname" | "lastname" | "id" | "username" | "avatarImage"
    >[]
  >([]);

  useEffect(() => {
    console.log("duipa");
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (!socket) return;

      socket.emit("searchUsers", search, (error, users) => {
        setIsLoading(false);
        if (error) return setError(error);

        if (users) setFoundUsers(users);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, socket]);

  return (
    <ul className="absolute top-[6rem] left-0 z-40 md:z-50 w-full translate-y-3   bg-white border shadow-2xl md:top-full">
      {isLoading && <li className="p-4">Ładowanie...</li>}
      {!isLoading && !error && foundUsers.length === 0 && (
        <li className="p-4">Brak wyników wyszukiwania!</li>
      )}
      {!isLoading &&
        !error &&
        foundUsers.length > 0 &&
        foundUsers.map((user) => <SearchListItem user={user} key={user.id} />)}
      {!isLoading && error && (
        <li className="p-4 text-red-500">Wystąpił błąd: {error}</li>
      )}
    </ul>
  );
}
