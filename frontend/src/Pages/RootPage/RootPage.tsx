// import Post from "@components/Post";
import Suggestions from "@components/Suggestions";
import Post from "@components/Post";
import SpinnerLoader from "@components/SpinnerLoader";
import useGetRootPageFeed from "hooks/useGetRootPageFeed";

const RootPage = () => {
	const { data, isLoading, error } = useGetRootPageFeed();

	return (
		<div className="flex w-full h-full gap-4 px-1 md:gap-16 md:px-32">
			<ul className="h-full mx-auto space-y-4 overflow-y-auto w-fit posts">
				{isLoading && (
					<li className="flex justify-center w-full p-4">
						<SpinnerLoader />
					</li>
				)}
				{!isLoading && error != null && (
					<p className="w-full p-4 text-center">Oops! Error occured!</p>
				)}
				{!isLoading && !error && data && data.length === 0 && (
					<p className="w-full p-4 text-center">No posts available yet!</p>
				)}
				{!isLoading &&
					!error &&
					data &&
					data.length > 0 &&
					data.map((post) => (
						<Post
							key={post.id}
							id={post.id}
							image={post.image}
							publishedAt={post.publishedAt}
							textContent={post.textContent}
							userData={{
								id: post.authorId,
								username: post.authorUsername,
								firstname: post.authorFirstname,
								lastname: post.authorLastname,
								avatarImage: post.authorAvatarImage,
							}}
						/>
					))}
			</ul>
			<Suggestions />
		</div>
	);
};
export default RootPage;
