const SpinnerLoader = () => {
  return (
    <div className="grid w-8 h-8 place-items-center">
      <div className="w-full h-full border-[6px] rounded-full border-cyan-600 border-t-slate-200 animate-spin"></div>
    </div>
  );
};
export default SpinnerLoader;
