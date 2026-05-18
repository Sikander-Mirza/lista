// CropperModal.jsx
import React, { useRef } from "react";
import Cropper from "react-cropper";
import "../../App.css";
import { ImageUpscale } from "lucide-react";

const CropperModal = ({ image, onSave, onClose, aspectRatio = 1 }) => {
  const cropperRef = useRef(null);

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const file = new File([blob], "cropped.jpg", { type: blob.type });
        onSave(file);
      });
    }
  };

  return (
    <div className="fixed  overflow-hidden inset-0 z-50 bg-[#0000008f] bg-opacity-60 flex items-center justify-center">
      <div></div>
      <div className="bg-white relative overflow-hidden py-4 px-5 rounded-md shadow-lg w-[70%] max-w-[450px]">
        <div className="flex justify-between items-center  py-2 pb-4">
          <h1 className="font-Urbanist font-bold text-[30px]">
            Crop Image
          </h1>

          <ImageUpscale />
        </div>

        <div className="relative overflow-hidden">
          <Cropper
            src={image}
            style={{ height: 300, width: "100%" }}
            aspectRatio={aspectRatio}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            minCropBoxWidth={150}
            minCropBoxHeight={150}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black border-gray-200 font-Urbanist font-semibold px-6 hover-btn hover-btn-black  py-2 rounded"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={cropImage}
            className="bg-PurpleColor cursor-pointer hover-btn hover-btn-purple font-Urbanist font-semibold text-white px-6 py-2 rounded"
          >
            <span>Crop</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
