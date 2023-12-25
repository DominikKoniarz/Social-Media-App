const ProfileBody = () => {
  return (
    <section className="w-full px-10 pt-3 pb-8 bg-white h-fit">
      <p className="text-base font-normal text-teal-500 family1">online</p>
      <article className="flex items-center gap-4 ">
        <p className="text-xl font-medium text-zinc-950 family1">
          Placeholder Name
        </p>
        <p className="text-base font-light lowercase text-slate-800 family1">
          @PlaceholderAlias
        </p>
      </article>
      <p className="text-base font-normal text-slate-800 family1">
        Ui/UX Designer
      </p>
      <section className="flex flex-col py-4">
        <p className="text-zinc-950 pb-2 text-[19px] font-medium family1">
          About Me
        </p>
        <article className="text-base font-light leading-normal text-black family1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </article>
      </section>
    </section>
  );
};
export default ProfileBody;
