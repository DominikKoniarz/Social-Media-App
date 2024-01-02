import useSocketContext from "hooks/useSocketContext";
import { UserData } from "../../../types/socket.io";
import { useState } from "react";

export default function useSubmitUserData() {
	const { socket, setUserData } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>("");

	const submitUserData = (
		userData: Pick<
			UserData,
			"bio" | "firstname" | "location" | "websiteURL" | "lastname"
		>
	) => {
		if (!socket) return;

		setIsLoading(true);
		setSubmitError(null);

		socket.emit("submitUserData", userData, (error) => {
			setIsLoading(false);

			if (error) {
				setSubmitError(error);
				return;
			}

			setUserData((prev) => {
				if (!prev) return null;

				return { ...prev, ...userData };
			});
		});
	};

	return { submitUserData, isLoading, submitError };
}
