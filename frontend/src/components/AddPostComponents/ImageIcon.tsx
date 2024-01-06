import { FileRejection, useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa6";

type Props = {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
};

const ImageIcon = ({ onDrop }: Props) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
    maxSize: 6291456 /* 6MB */,
  });

  return (
    <div
      className="flex items-center justify-center focus:outline-none focus:border-none hover:cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <button
        className=""
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        <FaImage />
      </button>
    </div>
  );
};
export default ImageIcon;
