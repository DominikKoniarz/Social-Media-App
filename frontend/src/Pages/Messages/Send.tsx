import { FaRegPaperPlane } from "react-icons/fa6";

const Send = () => {
	return (
		<button
			type="submit"
			className="flex items-center justify-center text-base text-gray-600 right-4 bottom-2 active:scale-[0.96] w-4 h-4"
		>
			<FaRegPaperPlane />
		</button>
	);
};

export default Send;
