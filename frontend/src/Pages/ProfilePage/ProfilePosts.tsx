import useGetCurrentUserPosts from "hooks/useGetCurrentUserPosts";
import UserPost from "./UserPost";
import SpinnerLoader from "@components/SpinnerLoader";
import { useEffect } from "react";

const ProfilePosts = () => {
	const { isLoading, error, posts } = useGetCurrentUserPosts();

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
			{!isLoading && !error && posts && (
				<ul className="w-full space-y-4 h-fit">
					{posts.map((post) => (
						<UserPost
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
