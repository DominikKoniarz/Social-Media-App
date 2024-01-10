import useGetCurrentUserPosts from "hooks/useGetCurrentUserPosts";
import SpinnerLoader from "@components/SpinnerLoader";
import { useEffect } from "react";
import UserPost from "@components/UserPost";
import useSocketContext from "hooks/useSocketContext";

const ProfilePosts = () => {
	const { isLoading, error, posts } = useGetCurrentUserPosts();
	const { userData } = useSocketContext();

	useEffect(() => {
		if (error && import.meta.env.DEV) console.log(error);
	}, [error]);

	return (
		<>
			{isLoading && (
				<div className="flex justify-center w-full p-4">
					<SpinnerLoader />
				</div>
			)}
			{!isLoading && error && (
				<div className="w-full p-4 text-center">Wystąpił błąd!</div>
			)}
			{!isLoading && !error && posts && posts.length === 0 && (
				<div className="w-full p-4 text-center">Brak wpisów!</div>
			)}
			{!isLoading && !error && posts && userData && (
				<ul className="w-full space-y-4 h-fit">
					{posts.map((post) => (
						<UserPost
							userData={userData}
							key={post.id}
							id={post.id}
							textContent={post.textContent}
							publishedAt={new Date(post.publishedAt)}
							image={post.image}
						/>
					))}
				</ul>
			)}
		</>
	);
};
export default ProfilePosts;
