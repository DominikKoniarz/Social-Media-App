import useSocketContext from "hooks/useSocketContext";
import FoundProfileBody from "./FoundProfileBody";
import FoundProfileHeader from "./FoundProfileHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetFoundUserData from "hooks/useGetFoundUserData";
import SpinnerLoader from "@components/SpinnerLoader";
import FoundProfilePosts from "./FoundProfilePosts";

type Params = {
	id: string;
};

const FoundProfilePage = () => {
	const { id } = useParams<Params>();
	const navigate = useNavigate();
	const { userData } = useSocketContext();
	const {
		isLoading,
		error,
		userData: foundUserData,
		posts,
		isFound,
	} = useGetFoundUserData(id);

	useEffect(() => {
		if (userData?.id === id) return navigate("/profile");
	}, [id, navigate, userData]);

	if (isLoading)
		return (
			<div className="flex justify-center w-full p-6">
				<SpinnerLoader />
			</div>
		);

	if (!isLoading && error)
		return (
			<div className="flex justify-center w-full p-6">
				<p className="text-2xl font-medium text-zinc-900">
					Oops! Something went wrong!
				</p>
			</div>
		);

	if (!isLoading && !isFound)
		return (
			<div className="flex justify-center w-full p-6">
				<p className="text-2xl font-medium text-zinc-900">User not found!</p>
			</div>
		);

	if (!isLoading && !error && foundUserData && posts && isFound)
		return (
			<main className="w-full h-full px-6 mx-auto overflow-y-auto profile">
				<section className="bg-white">
					<FoundProfileHeader foundUserData={foundUserData} />
					<FoundProfileBody foundUserData={foundUserData} />
				</section>
				<section className="flex w-full h-full gap-4 pt-4">
					<FoundProfilePosts posts={posts} foundUserData={foundUserData} />
				</section>
			</main>
		);
};
export default FoundProfilePage;
