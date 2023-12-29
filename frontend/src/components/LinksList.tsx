import type { IconType } from "react-icons";
import { FaBell, FaHouse, FaEnvelope, FaUser } from "react-icons/fa6";
import LinksListItem from "./LinksListItem";

export type Item = {
  text: string;
  link: string;
  icon: IconType;
};

export default function LinksList() {
  const items: Item[] = [
    {
      text: "Home",
      link: "/",
      icon: FaHouse,
    },
    {
      text: "Notifications",
      link: "/notifications",
      icon: FaBell,
    },
    {
      text: "Messages",
      link: "/messages",
      icon: FaEnvelope,
    },
    {
      text: "Profile",
      link: "/profile",
      icon: FaUser,
    },
  ];

  return (
    <ul className="flex flex-col w-full px-4 mt-10 gap-y-8">
      {items.map((item, index) => (
        <LinksListItem
          text={item.text}
          link={item.link}
          icon={item.icon}
          key={index}
        />
      ))}
    </ul>
  );
}
