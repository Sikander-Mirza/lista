import { Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

const AddPhotoSection = ({ register, setValue, error, DefaultImage = [] }) => {
  const [defaultImages, setDefaultImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (
      Array.isArray(DefaultImage) &&
      (DefaultImage.length !== defaultImages.length ||
        !DefaultImage.every((val, idx) => val === defaultImages[idx]))
    ) {
      setDefaultImages(DefaultImage);
    }
  }, [DefaultImage]);

  const prevCombinedRef = useRef([]);

  useEffect(() => {
    const combined = [...defaultImages, ...uploadedImages];

    const isSame =
      Array.isArray(prevCombinedRef.current) &&
      prevCombinedRef.current.length === combined.length &&
      prevCombinedRef.current.every((val, idx) => val === combined[idx]);

    if (!isSame) {
      prevCombinedRef.current = combined;
      setValue("fileInput", combined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [defaultImages, uploadedImages, setValue]);

  const handleChange = (e) => {
    setUploadError("");

    const newFiles = Array.from(e.target.files);

    // Check file size of each new file
    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(
          `Each image must be less than 20 MB. "${file.name}" is too large.`
        );
        return;
      }
    }

    // Check total image count (existing + new)
    if (
      defaultImages.length + uploadedImages.length + newFiles.length >
      MAX_IMAGES
    ) {
      setUploadError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    setUploadedImages((prev) => [...prev, ...newFiles]);

    // Clear the input so user can upload same file again if needed
    e.target.value = null;
  };

  const removeDefaultImage = (indexToRemove) => {
    const updated = defaultImages.filter((_, index) => index !== indexToRemove);
    setDefaultImages(updated);
  };

  const removeUploadedImage = (indexToRemove) => {
    const updated = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(updated);
  };

  return (
    <>
      <label className="block font-[700] text-PurpleColor w-full text-[15px] sm:text-[16.5px]">
        Property Photos
      </label>

      <div className="mt-4 rounded-xl relative">
        <div className="flex flex-col items-center justify-center w-full py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
          <div className="flex flex-col justify-center md:px-9 items-center gap-3">
            <Upload className="lg:size-20 md:size-14 sm:size-12 size-11" />
            <p className="text-center text-[15.5px] sm:text-[17px] md:text-[19px] lg:text-[22px] font-semibold w-[80%] sm:w-[60%]">
              Drag and drop your images here PNG, JPG, WEBP up to 10MB each
            </p>

            <div className="relative w-full flex flex-col items-center">
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp"
                multiple
                onChange={handleChange}
              />
              <label
                htmlFor="fileInput"
                className="inline-block cursor-pointer w-max text-center bg-PurpleColor text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition hover-btn hover-btn-purple"
              >
                <span className="text-[14px] sm:text-[14.5px] md:text-[15px] lg:text-[17px]">
                  Select Files
                </span>
              </label>

              <input
                type="hidden"
                {...register("fileInput", {
                  required: "At least one image is required.",
                  validate: (val) =>
                    (Array.isArray(val) && val.length > 0) ||
                    "At least one image is required.",
                })}
              />
            </div>
          </div>
        </div>

        {/* Show validation error from upload */}
        {uploadError && (
          <p className="text-red-500 font-[500] text-[14px] pt-4 font-Urbanist tracking-wide">
            {uploadError}
          </p>
        )}

        {/* Show form validation error */}
        {error && (
          <p className="text-red-500 font-[500] text-[14px] pt-4 font-Urbanist tracking-wide">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </div>

      {(defaultImages.length > 0 || uploadedImages.length > 0) && (
        <div className="pt-5">
          <h1 className="font-Urbanist font-[500] mb-2 text-[#242424] text-[15px] lg:text-[17px]">
            Selected Images*
          </h1>
          <div className="flex flex-wrap gap-4">
            {/* Default Images from server */}
            {defaultImages.map((item, index) => (
              <div className="relative" key={`default-${index}`}>
                <img
                  className="object-cover w-32 h-28 lg:w-40 lg:h-36 rounded-2xl"
                  src={
                    typeof item === "string"
                      ? import.meta.env.VITE_IMAGE_KEY + item
                      : URL.createObjectURL(item)
                  }
                  alt={`Default ${index}`}
                />
                <X
                  onClick={() => removeDefaultImage(index)}
                  className="size-5 lg:size-6 absolute top-2 right-2 px-1 bg-PurpleColor text-white font-semibold rounded-full cursor-pointer"
                />
              </div>
            ))}

            {/* Newly uploaded files */}
            {uploadedImages.map((file, index) => (
              <div className="relative" key={`upload-${index}`}>
                <img
                  className="object-cover w-32 h-28 lg:w-40 lg:h-36 rounded-2xl"
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                />
                <X
                  onClick={() => removeUploadedImage(index)}
                  className="size-5 lg:size-6 absolute top-2 right-2 px-1 bg-PurpleColor text-white font-semibold rounded-full cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AddPhotoSection;
