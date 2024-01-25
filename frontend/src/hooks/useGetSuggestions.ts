import { useQuery } from "react-query";
import useSocketContext from "./useSocketContext";
import { Suggestion } from "../../../types/socket.io";

const useGetSuggestions = () => {
	const { socket } = useSocketContext();

	return useQuery({
		queryKey: ["suggestions", socket?.id],
		queryFn: (): Promise<Suggestion[]> =>
			new Promise((resolve) => {
				if (!socket) return resolve([]);

				socket.emit("getSuggestions", (error, suggestions) => {
					if (error) return resolve([]);

					if (suggestions) resolve(suggestions);
				});
			}),
		staleTime: 1000 * 60 * 15,
		refetchInterval: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
	});
};

export default useGetSuggestions;
