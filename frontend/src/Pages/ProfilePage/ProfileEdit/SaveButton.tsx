import SpinnerLoader from "@components/SpinnerLoader";

type Props = {
  isLoading: boolean;
};
const SaveButton = ({ isLoading }: Props) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="text-white bg-teal-500 rounded-md py-4 px-16 text-xl font-semibold  border-2 border-teal-500 uppercase leading-[14.50px]"
    >
      {!isLoading ? "save" : <SpinnerLoader />}
    </button>
  );
};
export default SaveButton;
