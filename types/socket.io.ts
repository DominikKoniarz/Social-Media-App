export type CropData = {
	width: number;
	height: number;
	x: number;
	y: number;
	scaleX: number;
	scaleY: number;
};

export interface ServerToClientEvents {
	serverError: (error: string) => void;
}

export interface ClientToServerEvents {
	getUserData: (callback: (userData: UserData | null) => void) => void;
	submitUserData: (
		userData: Omit<UserData, "username">,
		callback: (error: string | null) => void
	) => void;
	saveAvatarImage: (
		imageBuffer: ArrayBuffer,
		imageName: string,
		cropData: CropData,
		callback: (error: string | null, newImageName: string | null) => void
	) => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	userId?: string;
}

export type UserData = {
	id: string;
	username: string;
	firstname: string | null;
	lastname: string | null;
	bio: string | null;
	websiteURL: string | null;
	location: string | null;
	avatarImage: string | null;
	backgroundImage: string | null;
};
