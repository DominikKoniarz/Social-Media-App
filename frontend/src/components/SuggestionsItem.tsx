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
    </li>
  );
};
export default SuggestionsItem;
