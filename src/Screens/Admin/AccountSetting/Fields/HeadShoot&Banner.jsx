import { useEffect, useState } from "react";
import UnkownUser from "../../../../assets/fallback/ProfileImage.jpg";
import { Camera, Pen } from "lucide-react";
import Spinner from "../../../../Components/Spinner/Spinner";
import CropperModal from "../../../../Components/ImageCropper/ImageCropper";

const HeadShootBanner = ({ setValue, defaultBanner, defaultHeadshot }) => {
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState(null);
  const [cropType, setCropType] = useState("profile");
  // Create preview URLs for images
  const bannerPreview = bannerImage ? URL.createObjectURL(bannerImage) : null;
  const profilePreview = profileImage
    ? URL.createObjectURL(profileImage)
    : null;

  useEffect(() => {
    setValue("banner", bannerImage);
  }, [bannerImage, setValue]);

  useEffect(() => {
    setValue("headshot", profileImage);
  }, [profileImage, setValue]);

  const handleFileSelect = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setRawImage(reader.result);
      setCropType(type);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="relative">
        <div className="relative">
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="h-[34vh] rounded-[10px] object-cover w-full"
            />
          ) : defaultBanner ? (
            <img
              src={import.meta.env.VITE_IMAGE_KEY + defaultBanner}
              alt="Default Banner"
              className="h-[34vh] rounded-[10px] object-cover w-full"
            />
          ) : (
            <div className="bg-[#123764] h-[34vh] w-full rounded-[10px] flex justify-center items-center">
              
            </div>
          )}
        </div>

        {/* Icon Button for Banner Upload */}
        <label title={"Click to upload your banner image"} className="absolute top-3 right-3 z-10 bg-white p-1.5 sm:p-2 rounded-[8px] shadow cursor-pointer hover:bg-gray-100 transition hover-btn hover-btn-white">
          <span>
            <Pen className="size-3 sm:size-4 lg:size-4.5" />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setBannerImage(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Profile Section */}
      <div className="ml-0 sm:ml-7 md:ml-4 xl:ml-10 -mt-20 relative items-center flex justify-center sm:justify-start">
        <div className="relative w-max sm:w-[25%] md:w-[27%] xl:w-[21%]">
          {defaultHeadshot === undefined ? (
            <div className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          ) : (

            <div className="w-full h-auto max-w-[150px]  sm:max-w-[160px]  xl:max-w-[180px] 2xl:max-w-[250px] mx-auto">
              <img
                className="w-full aspect-square rounded-full object-cover border-4 border-PurpleColor"
                src={
                  profilePreview ||
                  (defaultHeadshot
                    ? import.meta.env.VITE_IMAGE_KEY + defaultHeadshot
                    : UnkownUser)
                }
                alt="Profile"
              />
            </div>

          )}

          <label className="absolute bottom-3.5 sm:bottom-4.5 right-0.5 sm:right-0.5 md:right-3.5 lg:right-2  xl:right-2 min-[1780px]:!right-10.5 z-10 bg-black p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 text-white transition hover-btn hover-btn-black">
            <span>
              <Camera className="size-3.5 sm:size-4 xl:size-4.5 2xl:size-5.5" />
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e, "profile")}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {showCropper && (
        <CropperModal
          image={rawImage}
          aspectRatio={cropType === "banner" ? 3 : 1}
          onSave={(croppedFile) => {
            if (cropType === "profile") {
              setProfileImage(croppedFile);
            } else {
              setBannerImage(croppedFile);
            }
            setShowCropper(false);
          }}
          onClose={() => setShowCropper(false)}
        />
      )}
    </>
  );
};

export default HeadShootBanner;
