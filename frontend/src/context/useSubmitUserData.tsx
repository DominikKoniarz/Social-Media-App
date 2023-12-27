import useSocketContext from "hooks/useSocketContext";
import { UserData } from "../../../types/socket.io";
import { useState } from "react";

export default async function useSubmitUserData() {
	const { socket, setUserData } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>("");

	if (!socket) return;

	const submitUserData = (userData: UserData) => {
		setIsLoading(true);

		socket.emit("submitUserData", userData, (error) => {
			setIsLoading(false);

			if (error) {
				setSubmitError(error.message);
				return;
			}

			setUserData(userData);
		});
	};

	return { submitUserData, isLoading, submitError };
}
