import UserPost from "@components/UserPost";
import { Post, UserData } from "../../../../types/socket.io";

type Props = {
	posts: Post[];
	foundUserData: UserData;
};

export default function FoundProfilePosts({ posts, foundUserData }: Props) {
	return (
		<ul className="w-full space-y-4 h-fit">
			{posts.map((post) => (
				<UserPost
					userData={foundUserData}
					key={post.id}
					id={post.id}
					textContent={post.textContent}
					publishedAt={new Date(post.publishedAt)}
					image={post.image}
				/>
			))}
		</ul>
	);
}
