type Props = {
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
};

const AddPost = ({ newPost, setNewPost }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col w-full gap-2 p-4 bg-white border-b-[1px] border-neutral-200 "
    >
      <textarea
        placeholder="Write something here!"
        id="post-textarea"
        className="w-full p-4 text-lg font-light text-gray-700 font-family1"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <div className="flex flex-row-reverse w-full ">
        <button
          type="submit"
          className="px-3 py-3 bg-teal-500 rounded-md shadow w-fit"
        >
          Publish Post
        </button>
      </div>
    </form>
  );
};
export default AddPost;
