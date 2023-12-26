export interface ServerToClientEvents {}

export interface ClientToServerEvents {
	getUserData: (callback: (userData: UserData) => void) => void;
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
