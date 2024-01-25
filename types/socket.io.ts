export type CropData = {
	width: number;
	height: number;
	x: number;
	y: number;
	scaleX: number;
	scaleY: number;
};

export interface ServerToClientEvents {
	newMessage: (conversationId: string, message: UserMessage) => void;
}

export interface ClientToServerEvents {
	getUserData: (callback: (userData: UserData | null) => void) => void;
	submitUserData: (
		userData: Pick<
			UserData,
			"bio" | "firstname" | "lastname" | "location" | "websiteURL"
		>,
		callback: (error: string | null) => void
	) => void;
	saveAvatarImage: (
		imageBuffer: ArrayBuffer,
		imageName: string,
		cropData: CropData,
		callback: (error: string | null, newImageName: string | null) => void
	) => void;
	deleteAvatarImage: (callback: (error: string | null) => void) => void;
	saveBackgroundImage: (
		imageBuffer: ArrayBuffer,
		imageName: string,
		cropData: CropData,
		callback: (error: string | null, newImageName: string | null) => void
	) => void;
	deleteBackgroundImage: (callback: (error: string | null) => void) => void;
	addPost: (
		textContent: string,
		imageBuffer: ArrayBuffer | null,
		imageName: string | null,
		releaseDate: Date | null,
		callback: (error: string | null) => void
	) => void;
	getCurrentUserPosts: (
		callback: (error: string | null, posts: Post[] | null) => void
	) => void;
	searchUsers: (
		searchText: string,
		callback: (
			error: string | null,
			users:
				| Pick<
						UserData,
						"id" | "username" | "firstname" | "lastname" | "avatarImage"
				  >[]
				| null
		) => void
	) => void;
	getFoundUserData: (
		id: string,
		callback: (
			error: string | null,
			userData: UserData | null,
			posts: Post[] | null
		) => void
	) => void;
	getConversations: (
		callback: (
			error: string | null,
			conversations: Conversation[] | null
		) => void
	) => void;
	createNewConversation: (
		otherUserId: string,
		message: string,
		callback: (error: string | null, conversation: Conversation | null) => void
	) => void;
	sendMessage: (
		conversationId: string,
		message: string,
		callback: (error: string | null, message: UserMessage | null) => void
	) => void;
	deletePost: (id: string, callback: (error: string | null) => void) => void;
	getUserActivity: (
		id: string,
		callback: (error: string | null, active: boolean | null) => void
	) => void;
	getRootPageFeed: (
		callback: (error: string | null, posts: RootPagePost[] | null) => void
	) => void;
	switchPostLike: (
		postId: string,
		callback: (error: string | null, liked: boolean | null) => void
	) => void;
	getSuggestions: (
		callback: (error: string | null, suggestions: Suggestion[] | null) => void
	) => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	userId?: string;
}

export type UserMessage = {
	id: string;
	textContent: string;
	createdAt: string;
	senderId: string;
	receiverId: string;
};

export type Conversation = {
	id: string;
	otherUserId: string;
	otherUserUsername: string;
	otherUserFirstname: string | null;
	otherUserLastname: string | null;
	otherUserAvatarImage: string | null;
	messages: UserMessage[];
};

export type Post = {
	id: string;
	textContent: string;
	image: string | null;
	publishedAt: string;
	likes: number;
	isLikedByCurrentUser: boolean;
};

export type RootPagePost = Post & {
	authorId: string;
	authorUsername: string;
	authorFirstname: string | null;
	authorLastname: string | null;
	authorAvatarImage: string | null;
};

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

export type Suggestion = {
	id: string;
	username: string;
	email: string;
	avatarImage: string;
	backgroundImage: string;
};
