import useGetCurrentUserPosts from "hooks/useGetCurrentUserPosts";
import SpinnerLoader from "@components/SpinnerLoader";
import { useEffect } from "react";
import UserPost from "@components/UserPost";
import useSocketContext from "hooks/useSocketContext";

const ProfilePosts = () => {
	const { isLoading, error, posts, changePostLike } = useGetCurrentUserPosts();
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
				<div className="flex justify-center w-full p-4">Brak wpisów!</div>
			)}
			{!isLoading && !error && posts && userData && (
				<ul
					className={`w-full space-y-4 h-fit ${
						posts.length === 0 ? "hidden" : "block"
					}`}
				>
					{posts.map((post) => (
						<UserPost
							userData={userData}
							key={post.id}
							id={post.id}
							textContent={post.textContent}
							publishedAt={new Date(post.publishedAt)}
							image={post.image}
							likes={post.likes}
							isLikedByCurrentUser={post.isLikedByCurrentUser}
							mutateCliendPostLikeData={changePostLike}
						/>
					))}
				</ul>
			)}
		</>
	);
};
export default ProfilePosts;
