import { useState } from "react";
import useSocketContext from "./useSocketContext";

const useSwitchPostLike = () => {
	const { socket } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const switchPostLike = (
		postId: string,
		mutateClientData: (postId: string, liked: boolean) => void
	) => {
		if (!socket || isLoading) return;

		setIsLoading(true);

		socket.emit("switchPostLike", postId, (error, liked) => {
			setIsLoading(false);

			if (error) return import.meta.env.DEV && console.error(error);

			if (liked !== null) mutateClientData(postId, liked);
		});
	};

	return { switchPostLike, isLoading };
};

export default useSwitchPostLike;
