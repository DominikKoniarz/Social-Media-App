import Post from "./Post";

const RootPage = () => {
	return (
		<ul className="posts w-[684px] h-full overflow-y-auto space-y-4 mx-auto">
			<Post />
			<Post />
			<Post />
			<Post />
		</ul>
	);
};
export default RootPage;
