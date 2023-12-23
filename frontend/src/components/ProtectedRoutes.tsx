import { AxiosResponse } from "axios";
import useVerifyRefreshToken from "lib/useVerifyRefreshToken";
import { Outlet } from "react-router-dom";

export type OutletContextProps = {
	data: AxiosResponse | undefined;
	error: unknown;
};

export default function ProtectedRoutes() {
	const { data, error, isLoading } = useVerifyRefreshToken();

	console.log(data, error, isLoading);

	if (isLoading) return <div>Loading...</div>;

	return (
		<Outlet
			context={
				{
					data,
					error,
				} satisfies OutletContextProps
			}
		/>
	);
}
