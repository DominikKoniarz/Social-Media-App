import useSocketContext from "hooks/useSocketContext";
import Loader from "./ProfileEdit/Loader";

const ProfileBody = () => {
	const { userData } = useSocketContext();

	return (
		<section className="w-full px-5 pt-3 pb-4 bg-white lg:px-10 text-wrap h-fit">
			{userData ? (
				<>
					<article className="flex items-center gap-4 text-wrap ">
						{userData.firstname && userData.lastname && (
							<p className="text-xl font-medium text-wrap text-zinc-950 font-family1">
								{`${userData.firstname} ${userData.lastname}`}
							</p>
						)}

						<p className="text-base font-light lowercase text-wrap text-slate-800 font-family1">
							@{userData.username}
						</p>
					</article>
					<p className="text-base font-normal text-teal-500 font-family1">
						online
					</p>
					<section className="flex flex-col flex-wrap py-4">
						<p className="text-zinc-950 pb-2 text-[19px] font-medium font-family1">
							About Me
						</p>
						{!userData.bio ? (
							<article className="text-base font-light leading-normal text-black opacity-50 font-family1">
								No bio to display
							</article>
						) : (
							<article className="text-base font-light leading-normal text-black text-wrap h-fit font-family1">
								{userData.bio?.replace("\n", "<br>")}
							</article>
						)}
					</section>
				</>
			) : (
				<div className="pb-16">
					<Loader />
				</div>
			)}
		</section>
	);
};
export default ProfileBody;
