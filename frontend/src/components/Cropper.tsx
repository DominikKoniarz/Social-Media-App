import { useRef } from "react";
import ReactCropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  aspectRatio: number;
  src: string;
  setCropData: React.Dispatch<React.SetStateAction<Cropper.Data | undefined>>;
};

const Cropper = ({ aspectRatio, src, setCropData }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current?.cropper;
    const cropData = cropper.getData();
    setCropData(cropData);
  };

  return (
    <div className="h-[500px] w-auto z-10 mx-auto">
      <ReactCropper
        src={src}
        style={{ width: "auto", height: "100%" }}
        initialAspectRatio={aspectRatio}
        guides={false}
        dragMode="none"
        aspectRatio={aspectRatio}
        crop={onCrop}
        ref={cropperRef}
        autoCrop={true}
        rotatable={false}
        viewMode={2}
        cropBoxMovable={true}
        cropBoxResizable={true}
        zoomable={true}
      />
    </div>
  );
};
export default Cropper;
