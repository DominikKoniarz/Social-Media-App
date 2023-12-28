import SpinnerLoader from "@components/SpinnerLoader";
import { useState } from "react";

type Props = {
	isLoading: boolean;
};

const SaveButton = ({ isLoading }: Props) => {
	const [howManyWasClicked, setHowManyWasClicked] = useState<number>(0);

	return (
		<button
			type="submit"
			disabled={isLoading || howManyWasClicked > 0}
			className="text-white bg-teal-500 rounded-md py-4 px-16 text-xl font-semibold  border-2 border-teal-500 uppercase leading-[14.50px]"
			onClick={() => {
				setHowManyWasClicked((prev) => prev + 1);
			}}
		>
			{!isLoading ? "save" : <SpinnerLoader />}
		</button>
	);
};
export default SaveButton;
