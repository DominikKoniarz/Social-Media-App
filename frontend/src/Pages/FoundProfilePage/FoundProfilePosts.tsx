import { Post as PostType, UserData } from "../../../../types/socket.io";
import Post from "@components/Post";

type Props = {
	posts: PostType[];
	foundUserData: UserData;
	changePostLike: (postId: string, liked: boolean) => void;
};

export default function FoundProfilePosts({
	posts,
	foundUserData,
	changePostLike,
}: Props) {
	return (
		<ul className="w-full mt-4 space-y-4 h-fit">
			{posts.map((post) => (
				<Post
					userData={foundUserData}
					key={post.id}
					id={post.id}
					textContent={post.textContent}
					publishedAt={post.publishedAt}
					image={post.image}
					isLikedByCurrentUser={post.isLikedByCurrentUser}
					likes={post.likes}
					mutateCliendPostLikeData={changePostLike}
				/>
			))}
		</ul>
	);
}
