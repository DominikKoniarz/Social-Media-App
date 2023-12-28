type Props = {
  disabled: boolean;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
};

const Bio = ({ disabled, bio, setBio }: Props) => {
  return (
    <div className="flex flex-col">
      <p className="py-1">Bio</p>
      <label htmlFor="bio-textarea" className=" hidden absolute left-[-9999px]">
        Bio
      </label>
      <textarea
        disabled={disabled}
        placeholder="Write something about yourself!"
        id="bio-textarea"
        className="w-full p-4 border rounded disabled:opacity-50 bg-neutral-100 border-neutral-200"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );
};
export default Bio;
