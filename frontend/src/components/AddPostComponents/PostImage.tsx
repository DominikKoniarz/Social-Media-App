import { FaXmark } from "react-icons/fa6";

type Props = {
	imageBase64: string;
	clearImage: () => void;
};

const PostImage = ({ imageBase64, clearImage }: Props) => {
	return (
		<div className="relative w-fit h-fit">
			<button
				className="absolute p-1 text-base text-red-500 bg-white rounded-full top-2 right-2"
				onClick={clearImage}
			>
				<FaXmark />
			</button>
			<img className=" max-w-[630px] max-h-[300px]" src={imageBase64} />
		</div>
	);
};
export default PostImage;
