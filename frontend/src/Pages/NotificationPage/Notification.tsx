const Notification = () => {
  return (
    <li className="flex items-center gap-2 p-1 max-w-[900px] bg-white border-l-4 border-teal-500 rounded-md md:px-4 2xl:p-8">
      <div className="items-center justify-center p-6 border-2 border-black rounded-full"></div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="ml-2 text-sm font-medium md:text-base 2xl:text-lg text-zinc-950 font-family1">
            Placeholder Name
          </p>
          <p className="ml-1 text-xs font-light lowercase md:text-sm 2xl:text-base text-slate-800 font-family1">
            @AliasDanegoUżytkownika
          </p>
          <p className="text-xs font-light lowercase md:text-sm 2xl:text-base text-slate-800 font-family1">
            - 10min
          </p>
        </div>
        <p className="text-black ml-2 text-sm  max-h-32 overflow-hidden 2xl:text-base font-light font-family1 capitalize leading-[23px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          Lorem Ipsum has been the industry's standard dummy text
        </p>
      </div>
    </li>
  );
};
export default Notification;
