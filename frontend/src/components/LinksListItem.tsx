import { Link } from "react-router-dom";
import { Item } from "./LinksList";

export default function LinksListItem({ text, link, icon: Icon }: Item) {
  return (
    <li className="text-lg font-normal text-white transition-colors duration-200 rounded-md hover:bg-white hover:text-teal-500 shrink-0">
      <Link
        to={link}
        className="flex items-center justify-center gap-6 px-2 py-3 md:px-6 md:py-3 md:justify-start"
      >
        <Icon className="text-2xl md:text-xl " />
        <p className="hidden md:block">{text}</p>
      </Link>
    </li>
  );
}
