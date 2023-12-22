type Props = {
  isLoading: boolean;
};

const LogInButton = ({ isLoading }: Props) => {
  return (
    <button
      type="submit"
      className="bg-teal-500 flex justify-center items-center text-white text-xl font-semibold uppercase leading-[14.50px]  border border-none rounded-xl w-full md:w-[400px] h-[55px] flex-shrink-0"
    >
      {!isLoading ? (
        "log in"
      ) : (
        <div className="grid w-8 h-8 place-items-center">
          <div className="w-full h-full border-[6px] rounded-full border-cyan-600 border-t-slate-200 animate-spin"></div>
        </div>
      )}
    </button>
  );
};
export default LogInButton;
