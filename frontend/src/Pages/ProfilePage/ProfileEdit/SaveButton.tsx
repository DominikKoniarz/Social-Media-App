import SpinnerLoader from "@components/SpinnerLoader";
import { FaCheck, FaFloppyDisk } from "react-icons/fa6";
type Props = {
	isLoading: boolean;
	howManyWasClicked: number;
};

const SaveButton = ({ isLoading, howManyWasClicked }: Props) => {
	return (
		<button
			type="submit"
			disabled={isLoading || howManyWasClicked > 0}
			className="text-white bg-teal-500 rounded-md py-2 px-8 lg:py-4 lg:px-16 disabled:py-0 disabled:opacity-35 text-xl font-semibold  border-2 border-teal-500 uppercase leading-[14.50px]"
		>
			{howManyWasClicked === 0 ? (
				!isLoading ? (
					<>
						<p className="hidden md:block">save</p>
						<p className="items-center justify-center block text-2xl md:hidden">
							<FaFloppyDisk />
						</p>
					</>
				) : (
					<SpinnerLoader />
				)
			) : (
				<div className="flex items-center justify-center px-3 text-2xl">
					<FaCheck />
				</div>
			)}
		</button>
	);
};
export default SaveButton;
