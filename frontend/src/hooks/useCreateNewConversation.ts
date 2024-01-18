import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocketContext from "./useSocketContext";
import toast from "react-hot-toast";

const useCreateNewConversation = () => {
	const { socket, setConversations } = useSocketContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createNewConversation = (otherUserId: string, message: string) => {
		if (!socket || message.trim().length === 0 || isLoading) return;

		setIsLoading(true);

		socket.emit(
			"createNewConversation",
			otherUserId,
			message,
			(error, newConversation) => {
				setIsLoading(false);

				if (error) {
					import.meta.env.DEV && console.log(error);
					toast(error);
					return;
				}

				if (!error && newConversation) {
					setConversations((prev) => [newConversation, ...prev]);
					navigate(`/messages/${newConversation.id}`);
				}
			}
		);
	};

	return { createNewConversation, isLoading };
};

export default useCreateNewConversation;
