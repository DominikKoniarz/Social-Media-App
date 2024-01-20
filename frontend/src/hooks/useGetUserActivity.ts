import { useQuery } from "react-query";
import useSocketContext from "./useSocketContext";

const useGetUserActivity = (userId: string) => {
	const { socket } = useSocketContext();

	const { data } = useQuery({
		queryKey: ["user-activity", userId],
		queryFn: async (): Promise<{ active: boolean }> =>
			await new Promise((resolve) => {
				if (!socket) return resolve({ active: false });

				socket.emit("getUserActivity", userId, (error, isActive) => {
					if (error) {
						import.meta.env.DEV && console.log(error);
						return resolve({ active: false });
					}

					return resolve({ active: isActive ? true : false });
				});
			}),
		staleTime: 1000 * 60 * 5,
		refetchInterval: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	return { data };
};

export default useGetUserActivity;
