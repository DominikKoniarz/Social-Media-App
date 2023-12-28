import SpinnerLoader from "@components/SpinnerLoader";
import { FaCheck } from "react-icons/fa6";
type Props = {
  isLoading: boolean;
  howManyWasClicked: number;
};

const SaveButton = ({ isLoading, howManyWasClicked }: Props) => {
  return (
    <button
      type="submit"
      disabled={isLoading || howManyWasClicked > 0}
      className="text-white bg-teal-500 rounded-md py-4 px-16 disabled:py-0 disabled:opacity-35 text-xl font-semibold  border-2 border-teal-500 uppercase leading-[14.50px]"
    >
      {howManyWasClicked === 0 ? (
        !isLoading ? (
          "save"
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
