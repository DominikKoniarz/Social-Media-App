import { useQuery } from "react-query";
import useSocketContext from "./useSocketContext";
import { RootPagePost } from "../../../types/socket.io";
import { useEffect, useState } from "react";

const useGetRootPageFeed = () => {
	const { socket } = useSocketContext();
	const [data, setData] = useState<RootPagePost[] | undefined>(undefined);

	const {
		data: fetchedData,
		isLoading,
		error,
	} = useQuery({
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

	const changePostLike = (postId: string, liked: boolean) => {
		setData((prevData) => {
			if (!prevData) return prevData;

			return prevData.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						isLikedByCurrentUser: liked,
						likes: liked ? post.likes + 1 : post.likes - 1,
					};
				} else return post;
			});
		});
	};

	useEffect(() => {
		if (fetchedData) setData(fetchedData);
	}, [isLoading, fetchedData]);

	return { data, isLoading, error, changePostLike };
};

export default useGetRootPageFeed;
