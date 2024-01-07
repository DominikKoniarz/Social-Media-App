import axios, { AxiosError } from "axios";
import { REFRESH_TOKEN_URL } from "constraints";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { z } from "zod";

const Data = z.object({
	accessToken: z.string(),
});

const useVerifyRefreshToken = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const { data, isLoading, error, refetch, isRefetching } = useQuery({
		queryKey: "refreshToken",
		queryFn: async () =>
			await axios({
				method: "GET",
				url: REFRESH_TOKEN_URL,
				withCredentials: true,
			}),
		cacheTime: 0,
		retry: 0,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (!isLoading && !error && data) {
			const result = Data.safeParse(data.data);
			if (result.success) {
				setAccessToken(result.data.accessToken);
			}
		}

		if (!isLoading && error && import.meta.env.DEV) {
			console.log(
				error instanceof AxiosError && error.response
					? error.response.data.message
					: error
			);
		}
	}, [isLoading, error, data]);

	return { accessToken, setAccessToken, isLoading, refetch, isRefetching };
};

export default useVerifyRefreshToken;
