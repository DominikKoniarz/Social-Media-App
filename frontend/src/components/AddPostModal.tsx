import { Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { FaImage, FaRegCalendarDays } from "react-icons/fa6";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  addPostModalOpen: boolean;
  setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostModal = ({ addPostModalOpen, setAddPostModalOpen }: Props) => {
  const { userData, socket } = useSocketContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date | null>(new Date());
  const [textContent, setTextContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (e: Date | null) => {
    setReleaseDate(e);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);

      if (fileRejections.length > 0) {
        setError(fileRejections[0].errors[0].message);
        return;
      }

      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageFile(file);
        setImageBase64(reader.result as string);
        setImageName(file.name);
      };
    },
    []
  );

  const handleAddPost = async (callback: () => void) => {
    if (!socket || !imageFile || !textContent || !imageName) return;

    setError(null);

    const imageBuffer = await imageFile.arrayBuffer();

    socket.emit(
      "addPost",
      textContent,
      imageBuffer,
      imageName,
      releaseDate,
      (error) => {
        if (error) return setError(error);

        callback();
      }
    );
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
    maxSize: 6291456 /* 6MB */,
  });

  return (
    <Modal
      size={"6xl"}
      show={addPostModalOpen}
      onClose={() => setAddPostModalOpen(false)}
    >
      <Modal.Header className="bg-white rounded-none ">
        <span className="flex justify-center text-lg font-medium text-black md:text-xl">
          Add your post here {userData?.firstname ? userData.firstname : ""}
        </span>
      </Modal.Header>
      <Modal.Body className="bg-white ">
        <div className="flex flex-col justify-center w-full gap-2 ">
          <p className="text-lg">What are you thinking about?</p>
          <hr />
          <textarea
            value={textContent || ""}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Write what you want here!"
            className="w-full h-24 p-2 text-base leading-relaxed text-black border rounded-md border-slate-700 max-h-48 "
          ></textarea>
          <hr />

          {imageBase64 ? (
            <div className="w-full h-fit">
              <img className=" max-w-[630px] max-h-[300px]" src={imageBase64} />
            </div>
          ) : (
            <p className="px-0">Add your favourite pictures!</p>
          )}
          <hr />
          <div className="flex items-center h-8 gap-2 text-2xl text-black/50">
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

            <>
              <button
                className="pb-[2px]"
                onClick={() => {
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
              >
                <FaRegCalendarDays />
              </button>
              {isDatePickerOpen && (
                <DatePicker
                  selected={releaseDate}
                  onChange={handleDateChange}
                />
              )}
            </>

            {/* 
            <DatePicker
              customInput={<i></i>}
              className="ml-2"
              icon={<FaRegCalendarDays className="mt-[0.5px]" />}
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
            /> */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-white rounded-none">
        <div className="flex items-center gap-4">
          <button
            className="px-5 py-3 text-black capitalize bg-green-500 rounded-md"
            onClick={() => handleAddPost(() => setAddPostModalOpen(false))}
          >
            Publish it!
          </button>
          <button
            className="px-5 py-3 text-black capitalize bg-red-500 rounded-md"
            onClick={() => setAddPostModalOpen(false)}
          >
            Cancel
          </button>
        </div>
        {error && (
          <p className="mt-3 font-semibold text-left text-red-600">{error}</p>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default AddPostModal;
