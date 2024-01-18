const Notification = () => {
  return (
    <li className="flex items-center  p-2 max-w-[900px] bg-white border-l-4 border-teal-500 rounded-md md:px-4 2xl:p-8">
      <div className="items-center justify-center p-6 border-2 border-black rounded-full"></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1">
          <p className="ml-2 text-sm font-medium text-left md:text-base 2xl:text-lg text-zinc-950 font-family1">
            Placeholder Name
          </p>
          <div className="flex flex-col items-center justify-center gap-1 mr-8 md:m-0 lg:flex-row">
            <p className="ml-1 text-xs font-light lowercase md:text-sm xl:text-base text-slate-800 font-family1">
              @AliasDanegoUżytkownika
            </p>
            <p className="text-xs font-light lowercase md:text-sm xl:text-base text-slate-800 font-family1">
              - 10min
            </p>
          </div>
        </div>
        <p className="text-black ml-2 text-xs  max-h-32 overflow-hidden xl:text-base font-light font-family1 capitalize leading-[23px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          Lorem Ipsum has been the industry's standard dummy text
        </p>
      </div>
    </li>
  );
};
export default Notification;
