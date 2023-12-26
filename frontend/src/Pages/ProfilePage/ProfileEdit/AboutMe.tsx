type Props = {
  aboutMe: string;
  setAboutMe: React.Dispatch<React.SetStateAction<string>>;
};

const AboutMe = ({ aboutMe, setAboutMe }: Props) => {
  return (
    <div className="flex flex-col">
      <p className="py-1">About me</p>
      <label
        htmlFor="AboutMe-textarea"
        className=" hidden absolute left-[-9999px]"
      >
        About me
      </label>
      <textarea
        placeholder="Write something about yourself!"
        id="AboutMe-textarea"
        className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
      />
    </div>
  );
};
export default AboutMe;
