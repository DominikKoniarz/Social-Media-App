import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
const CancelButton = () => {
	const navigate = useNavigate();
	const handleCancel = () => {
		navigate("/profile");
	};

	return (
		<button
			onClick={handleCancel}
			type="button"
			className="text-teal-500 text-xl font-semibold  bg-white uppercase leading-[14.50px] border-2 border-teal-500 rounded-md py-2 px-8 lg:py-4 lg:px-16"
		>
			<p className="hidden md:block">cancel</p>
			<p className="items-center justify-center block text-2xl md:hidden">
				<FaArrowLeftLong />
			</p>
		</button>
	);
};
export default CancelButton;
