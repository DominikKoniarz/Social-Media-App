import { UserData } from "../../../../types/socket.io";

type Props = {
	foundUserData: UserData;
};

const FoundProfileBody = ({ foundUserData }: Props) => {
	return (
		<section className="w-full px-5 pt-3 pb-4 bg-white lg:px-10 h-fit">
			<article className="flex items-center gap-4 ">
				{foundUserData.firstname && foundUserData.lastname && (
					<p className="text-xl font-medium text-zinc-950 font-family1">
						{`${foundUserData.firstname} ${foundUserData.lastname}`}
					</p>
				)}

				<p className="text-base font-light lowercase text-slate-800 font-family1">
					@{foundUserData.username}
				</p>
			</article>
			<p className="text-base font-normal text-teal-500 font-family1">online</p>
			<section className="flex flex-col py-4">
				<p className="text-zinc-950 pb-2 text-[19px] font-medium font-family1">
					About Me
				</p>
				{!foundUserData.bio ? (
					<article className="text-base font-light leading-normal text-black opacity-50 font-family1">
						No bio to display
					</article>
				) : (
					<article className="text-base font-light leading-normal text-black font-family1">
						{foundUserData.bio?.replace("\n", "<br>")}
					</article>
				)}
			</section>
		</section>
	);
};
export default FoundProfileBody;
