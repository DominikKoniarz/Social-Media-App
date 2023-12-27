export interface ServerToClientEvents {
	serverError: (error: string) => void;
}

export interface ClientToServerEvents {
	getUserData: (callback: (userData: UserData | null) => void) => void;
	submitUserData: (
		userData: Omit<UserData, "username">,
		callback: (error: Error | null) => void
	) => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	userId?: string;
}

export type UserData = {
	username: string;
	firstname: string | null;
	lastname: string | null;
	bio: string | null;
	websiteURL: string | null;
	location: string | null;
};
