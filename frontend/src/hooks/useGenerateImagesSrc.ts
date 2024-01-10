import { APP_URL } from "constraints";

const useGenerateImageSrc = () => {
	const generatePostImageSrc = (
		userId: string,
		postId: string,
		imageName: string
	) => `${APP_URL}/media/${userId}/posts/${postId}/${imageName}`;

	const generateAvatarImageSrc = (userId: string, imageName: string) =>
		`${APP_URL}/media/${userId}/avatar/${imageName}`;

	const generateBackgroundImageSrc = (userId: string, imageName: string) =>
		`${APP_URL}/media/${userId}/background/${imageName}`;

	return {
		generatePostImageSrc,
		generateAvatarImageSrc,
		generateBackgroundImageSrc,
	};
};

export default useGenerateImageSrc;
