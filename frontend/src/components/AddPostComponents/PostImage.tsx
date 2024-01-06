type Props = {
  imageBase64: string;
};

const PostImage = ({ imageBase64 }: Props) => {
  return (
    <div className="w-full h-fit">
      <img className=" max-w-[630px] max-h-[300px]" src={imageBase64} />
    </div>
  );
};
export default PostImage;
