import { useState } from "react";
import useSocketContext from "./useSocketContext";
import { Post } from "../../../types/socket.io";

const POSTS_PER_PAGE = 7;

export default function useGetCurrentUserPosts() {
	const { socket } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(0);
	const [error, setError] = useState<string | null>("");
	const [areAllPostsFetched, setAreAllPostsFetched] = useState<boolean>(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const getCurrentUserPosts = () => {
		if (!socket) return;
		if (!areAllPostsFetched) return;

		setIsLoading(true);
		setError(null);

		socket.emit("getCurrentUserPosts", page, (error, posts, allPostsCount) => {
			setIsLoading(false);

			if (error) {
				setError(error);
				return;
			}

			if (posts && allPostsCount) {
				setPosts((prev) => [...prev, ...posts]);

				setPage((prev) => prev + 1);

				if (page * POSTS_PER_PAGE >= allPostsCount) {
					setAreAllPostsFetched(true);
				}
			}
		});
	};

	return { getCurrentUserPosts, isLoading, error, posts };
}
