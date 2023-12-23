import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "constraints";
import { z } from "zod";

const AccessTokenData = z.object({
	accessToken: z.string(),
	expiresIn: z.number(),
});

const getAccessToken = (): string | undefined => {
	const dataRaw = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
	if (!dataRaw) return undefined;

	const data = JSON.parse(dataRaw);

	const parsedData = AccessTokenData.safeParse(data);
	if (!parsedData.success) return undefined;

	if (parsedData.data.expiresIn < Date.now()) {
		localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
		return undefined;
	}

	return parsedData.data.accessToken;
};

const setAccessToken = (accessToken: string): void => {
	const data: z.infer<typeof AccessTokenData> = {
		accessToken,
		expiresIn: Date.now() + 1000 * 10,
	};

	localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, JSON.stringify(data));
};

const deleteAccessToken = () => {
	localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};

const useAccessToken = () => {
	return { getAccessToken, setAccessToken, deleteAccessToken };
};

export default useAccessToken;
