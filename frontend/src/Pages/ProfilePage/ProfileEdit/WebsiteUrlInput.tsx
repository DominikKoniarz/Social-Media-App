type Props = {
  websiteUrl: string;
  setWebsiteUrl: React.Dispatch<React.SetStateAction<string>>;
};

const WebsiteUrlInput = ({ websiteUrl, setWebsiteUrl }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <p className="py-1">WebsiteUrl</p>
      <label
        htmlFor="WebsiteUrl-input"
        className=" hidden absolute left-[-9999px]"
      >
        WebsiteUrl
      </label>
      <input
        className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
        type="text"
        placeholder="WebsiteUrl"
        id="WebsiteUrl-input"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
      />
    </div>
  );
};
export default WebsiteUrlInput;
