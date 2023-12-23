import { Link } from "react-router-dom";
import { Item } from "./LinksList";

export default function LinksListItem({ text, link, icon: Icon }: Item) {
	return (
		<li className="text-lg font-normal text-white transition-colors duration-200 rounded-md hover:bg-white hover:text-teal-500 shrink-0">
			<Link to={link} className="flex items-center gap-6 px-6 py-3">
				<Icon className="text-xl" />
				{text}
			</Link>
		</li>
	);
}
