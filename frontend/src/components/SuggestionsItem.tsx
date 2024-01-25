type Props = {
	src: string;
	alt: string;
};

import { FaEllipsisVertical } from "react-icons/fa6";

const SuggestionsItem = ({ src, alt }: Props) => {
	return (
		<li className="relative w-full h-full">
			<img className="z-10" src={src} alt={alt} />
			<div className="absolute z-20 text-xl text-white right-1 top-2 ">
				<FaEllipsisVertical />
			</div>
			<div className="absolute p-4 border-2 border-white rounded-full left-2 top-1"></div>
			<div className="absolute z-20 flex flex-col w-40 bottom-0 left-2">
				<p className="text-base leading-3 w-full font-semibold  text-white custom-outline2 font-family1">
					Placeholder
				</p>
				<p className="text-sm w-full font-light overflow-hidden whitespace-nowrap overflow-ellipsis text-white lowercase custom-outline2 font-family1">
					Placeholdermail@gmail.com
				</p>
			</div>
		</li>
	);
};
export default SuggestionsItem;
