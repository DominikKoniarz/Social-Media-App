type Props = {
  isLoading: boolean;
};

const SignUpButton = ({ isLoading }: Props) => {
  return (
    <button
      type="submit"
      className="bg-teal-500 text-white text-xl font-semibold uppercase leading-[14.50px] justify-center flex items-center  border border-none rounded-xl w-[400px] h-[55px] flex-shrink-0"
    >
      {!isLoading ? (
        <p>sign up</p>
      ) : (
        <div className="grid w-8 h-8 place-items-center">
          <div className="w-full h-full border-[6px] rounded-full border-cyan-600 border-t-slate-200 animate-spin"></div>
        </div>
      )}
    </button>
  );
};
export default SignUpButton;
