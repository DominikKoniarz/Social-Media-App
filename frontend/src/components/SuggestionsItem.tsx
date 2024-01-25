type Props = {
	src: string;
	alt: string;
};

import { FaEllipsisVertical } from "react-icons/fa6";

// should be divided into smaller components

const SuggestionsItem = ({ src, alt }: Props) => {
	return (
		<li className="relative block w-full h-[95px] shrink-0">
			<img className="object-cover w-full h-full" src={src} alt={alt} />
			<div className="absolute top-0 left-0 w-full h-full p-1.5 pr-0.5 flex flex-col justify-between gap-2">
				<div className="flex flex-row justify-between">
					<div className="p-4 border-2 border-white rounded-full left-2 top-1"></div>
					<div className="text-xl text-white">
						<FaEllipsisVertical />
					</div>
				</div>
				<div className="flex flex-col w-full gap-px left-2">
					<p className="w-full overflow-hidden text-base font-semibold leading-3 text-white whitespace-nowrap overflow-ellipsis custom-outline2 font-family1">
						Placeholderdasdadasdsadsadadadadasd
					</p>
					<p className="w-full overflow-hidden text-sm font-light text-white lowercase whitespace-nowrap overflow-ellipsis font-family1">
						Placeholdermail@gmail.com
					</p>
				</div>
			</div>
		</li>
	);
};
export default SuggestionsItem;
