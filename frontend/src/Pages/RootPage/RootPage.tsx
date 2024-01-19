// import Post from "@components/Post";
import Suggestions from "@components/Suggestions";

const RootPage = () => {
	return (
		<div className="flex h-full gap-4 px-1 md:gap-16 md:px-32 w-fit">
			<ul className="h-full mx-auto space-y-4 overflow-y-auto posts w-fit">
				{/* Narazie nie ruszać */}
				{/* <Post />
        <Post />
        <Post />
        <Post /> */}
			</ul>
			<Suggestions />
		</div>
	);
};
export default RootPage;
