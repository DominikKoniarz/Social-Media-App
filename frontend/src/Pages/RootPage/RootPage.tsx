import Suggestions from "@components/Suggestions";
import Post from "@components/Post";
import SpinnerLoader from "@components/SpinnerLoader";
import useGetRootPageFeed from "hooks/useGetRootPageFeed";
import useGetSuggestions from "hooks/useGetSuggestions";

const RootPage = () => {
	const { data, isLoading, error, changePostLike } = useGetRootPageFeed();
	const { data: suggestions, isLoading: isLoadingSuggestions } =
		useGetSuggestions();

	return (
		<div className="flex justify-between w-full h-full p-4 md:pt-0 md:px-16">
			<ul
				className={`h-full mx-auto space-y-4 overflow-y-auto w-full max-w-[680px] shrink-0 posts`}
			>
				{isLoading && (
					<li className="flex justify-center w-full p-4">
						<SpinnerLoader />
					</li>
				)}
				{!isLoading && error != null && (
					<p className="w-full p-4 text-lg text-center lg:text-xl xl:text-2xl">
						Oops! Error occured!
					</p>
				)}
				{!isLoading && !error && data && data.length === 0 && (
					<p className="w-full px-4 py-16 text-lg text-center lg:py-8 lg:text-xl">
						No posts available yet!
					</p>
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
							likes={post.likes}
							isLikedByCurrentUser={post.isLikedByCurrentUser}
							mutateCliendPostLikeData={changePostLike}
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
			{!isLoadingSuggestions && suggestions && suggestions?.length > 0 && (
				<Suggestions suggestions={suggestions} />
			)}
		</div>
	);
};
export default RootPage;
