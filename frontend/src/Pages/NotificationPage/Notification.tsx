const Notification = () => {
  return (
    <li className="flex items-center gap-2 p-8 bg-white border-l-4 border-teal-500 rounded-md">
      <div className="items-center justify-center p-6 border-2 border-black rounded-full"></div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="ml-2 text-lg font-medium text-zinc-950 font-family1">
            Placeholder Name
          </p>
          <p className="ml-1 text-base font-light lowercase text-slate-800 font-family1">
            @AliasDanegoUżytkownika
          </p>
          <p className="text-base font-light lowercase text-slate-800 font-family1">
            - 10min
          </p>
        </div>
        <p className="text-black ml-2 text-[15px] font-light font-family1 capitalize leading-[23px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
        </p>
      </div>
    </li>
  );
};
export default Notification;
