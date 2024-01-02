import Cropper from "@components/Cropper";
import { Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

type Props = {
  backgroundImageModalOpen: boolean;
  setBackgroundImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const BackgroundImageModal = ({
  backgroundImageModalOpen,
  setBackgroundImageModalOpen,
}: Props) => {
  const { socket, setUserData } = useSocketContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [cropData, setCropData] = useState<Cropper.Data>();
  const [error, setError] = useState<string | null>(null);

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

  const handleSaveBackgroundImage = async (callback: () => void) => {
    if (!socket || !imageFile || !cropData || !imageName) return;

    setError(null);

    const imageBuffer = await imageFile.arrayBuffer();

    socket.emit(
      "saveBackgroundImage",
      imageBuffer,
      imageName,
      cropData,
      (error, newImageSrc) => {
        if (error) return setError(error);

        setUserData((prev) => {
          if (!prev) return null;

          return { ...prev, backgroundImage: newImageSrc };
        });

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
      show={backgroundImageModalOpen}
      size={"5xl"}
      onClose={() => setBackgroundImageModalOpen(false)}
    >
      <Modal.Header className="flex items-center bg-white rounded-none">
        <h1 className="text-lg font-bold text-black bg-white ">
          Add or change background image
        </h1>
      </Modal.Header>
      <Modal.Body className="bg-white ">
        <div className="flex flex-col h-full bg-white">
          {imageBase64 && (
            <Cropper
              aspectRatio={1292 / 257}
              src={imageBase64}
              setCropData={setCropData}
            />
          )}
          <div
            className="py-6 focus:outline-none focus:border-none hover:cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {imageBase64 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className="px-4 py-2 text-sm text-white capitalize bg-teal-500 rounded-md"
                >
                  Change image
                </button>
              </>
            ) : (
              <p className="px-0">Click here or drag an image!</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-col items-start space-x-0 bg-white rounded-none">
        <div className="flex flex-row gap-6">
          <button
            disabled={!imageFile || !cropData || !imageName}
            onClick={() => {
              handleSaveBackgroundImage(() => {
                setBackgroundImageModalOpen(false);
                setImageFile(null);
                setImageBase64(null);
                setImageName(null);
              });
            }}
            className="px-5 py-3 text-white capitalize bg-teal-500 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <button
            color="gray"
            onClick={() => {
              setBackgroundImageModalOpen(false);
              setImageFile(null);
              setImageBase64(null);
              setImageName(null);
            }}
            className="px-5 py-3 text-white capitalize bg-red-500 rounded-md"
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
export default BackgroundImageModal;
