import useVerifyRefreshToken from "hooks/useVerifyRefreshToken";
import { ReactElement, createContext, useState } from "react";

type AuthContextType = {
	isTokenBeingVerified: boolean;
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
	firstEnteredPathName: string;
	refetchVerifyRefreshToken: () => void;
};

const initContextState: AuthContextType = {
	isTokenBeingVerified: false,
	accessToken: null,
	setAccessToken: () => {},
	firstEnteredPathName: "",
	refetchVerifyRefreshToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initContextState);

export const AuthContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const [firstEnteredPathName] = useState<string>(window.location.pathname);

	const { accessToken, setAccessToken, isLoading, isRefetching, refetch } =
		useVerifyRefreshToken();

	const isTokenBeingVerified = isLoading || isRefetching;

	const refetchVerifyRefreshToken = () => {
		refetch();
	};

	return (
		<AuthContext.Provider
			value={{
				isTokenBeingVerified,
				accessToken,
				setAccessToken,
				firstEnteredPathName,
				refetchVerifyRefreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
