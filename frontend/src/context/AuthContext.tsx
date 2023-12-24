import useVerifyRefreshToken from "hooks/useVerifyRefreshToken";
import { ReactElement, createContext } from "react";

type AuthContextType = {
	isTokenBeingVerified: boolean;
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const initContextState: AuthContextType = {
	isTokenBeingVerified: false,
	accessToken: null,
	setAccessToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initContextState);

export const AuthContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const {
		accessToken,
		setAccessToken,
		isLoading: isTokenBeingVerified,
	} = useVerifyRefreshToken();

	return (
		<AuthContext.Provider
			value={{
				isTokenBeingVerified,
				accessToken,
				setAccessToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
