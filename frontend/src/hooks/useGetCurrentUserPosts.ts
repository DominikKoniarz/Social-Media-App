import { useCallback, useEffect, useState } from "react";
import useSocketContext from "./useSocketContext";
import { Post } from "../../../types/socket.io";

export default function useGetCurrentUserPosts() {
	const { socket } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>("");
	const [posts, setPosts] = useState<Post[]>([]);

	const getCurrentUserPosts = useCallback(() => {
		if (!socket) return;

		setIsLoading(true);
		setError(null);

		socket.emit("getCurrentUserPosts", (error, posts) => {
			setIsLoading(false);

			if (error) {
				setError(error);
				return;
			}

			if (posts) {
				setPosts(posts);
			}
		});
	}, [socket]);

	useEffect(() => {
		getCurrentUserPosts();
	}, [getCurrentUserPosts]);

	return { isLoading, error, posts };
}
