import { FaRegPaperPlane } from "react-icons/fa6";

type Props = {
	isLoading?: boolean;
};

const Send = ({ isLoading }: Props) => {
	return (
		<button
			type="submit"
			className={`flex items-center justify-center text-base transition-colors duration-200 text-gray-600 right-4 bottom-2 active:scale-[0.96] w-4 h-4 ${
				isLoading ? "opacity-50" : "opacity-100"
			}`}
		>
			<FaRegPaperPlane />
		</button>
	);
};

export default Send;
