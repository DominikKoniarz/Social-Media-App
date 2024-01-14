import { APP_URL } from "constraints";

const useGenerateConversationUrl = (conversationId: string) => {
	const baseUrl = import.meta.env.PROD ? APP_URL : "http://localhost:5173";

	return `${baseUrl}/messages/${conversationId}`;
};

export default useGenerateConversationUrl;
