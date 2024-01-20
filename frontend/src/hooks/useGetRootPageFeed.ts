import { useQuery } from "react-query";
import useSocketContext from "./useSocketContext";
import { RootPagePost } from "../../../types/socket.io";

const useGetRootPageFeed = () => {
	const { socket } = useSocketContext();

	const { data, isLoading, error } = useQuery({
		queryKey: ["root-posts", socket?.id],
		queryFn: async (): Promise<RootPagePost[]> => {
			return await new Promise((resolve) => {
				if (!socket) return resolve([]);

				socket.emit("getRootPageFeed", (error, posts) => {
					if (error) {
						import.meta.env.DEV && console.log(error);
						throw new Error(error);
					}

					if (posts) resolve(posts);
					else resolve([]);
				});
			});
		},
		staleTime: 1000 * 60 * 15,
		refetchInterval: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
	});

	return { data, isLoading, error };
};

export default useGetRootPageFeed;
