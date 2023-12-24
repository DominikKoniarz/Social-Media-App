import Header from "./Header";
import NavBar from "./NavBar";
import Post from "./Post";

const RootPage = () => {
	return (
		<div className="w-full h-full p-0">
			<Header />
			<main className="relative flex h-[calc(100%-74px)]  p-4 px-16 pb-0 bg-zinc-100">
				<NavBar />
				<ul className="posts w-[684px] h-full overflow-y-auto space-y-4 mx-auto">
					<Post />
					<Post />
					<Post />
					<Post />
				</ul>
				<NavBar />
			</main>
		</div>
	);
};
export default RootPage;
