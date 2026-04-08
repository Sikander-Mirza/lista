import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

import SocialIcons1 from "../../../assets/Icons/SocialIcons1.png"; 
import SocialIcons2 from "../../../assets/Icons/SocialIcons2.png"; 
import SocialIcons4 from "../../../assets/Icons/SocialIcons4.png"; 
import SocialIcons5 from "../../../assets/Icons/SocialIcons5.png";

const SocialPage = ({ id, setLoading }) => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const listingUrl = `https://newlista.secureserverinternal.com/share/property/${id}`;
  const encodedListingUrl = encodeURIComponent(listingUrl);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedListingUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedListingUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedListingUrl}&text=Check out this property!`,
    email: `mailto:?subject=Check out this property&body=Check this out: ${window.location.origin}/properties/${id}`,
    instagram: null,
  };

  // API call with axios
  const callViewAPI = async (platform) => {




    try {
      const response = await axios.post(
        `${ApiKey}/listing/share`,
        {
          property_id: id,
          platform: platform,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
    }
  };
  const openShare = async (platform) => {
    try {
      setLoading(true);
      await callViewAPI(platform);

      const url = shareUrls[platform];
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        Swal.fire({
          icon: "info",
          title: "Network Error",
          toast: true,
          position: "bottom-right",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    await callViewAPI("copy_link");

    try {
      await navigator.clipboard.writeText(`${window.location.origin}/properties/${id}`);
      Swal.fire({
        toast: true,
        position: "bottom-right",
        icon: "success",
        title: "Property link copied!",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: "bottom-right",
        icon: "error",
        title: "Failed to copy link.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="flex lg:justify-center md:items-center flex-col sm:flex-row mt-4 lg:mt-0 gap-2">
      <h2 className="font-Poppins text-[20px] font-[500] text-[#222222]">
        Share Links
      </h2>
      <div className="flex gap-2">
        <div onClick={() => openShare("facebook")} className="cursor-pointer">
          <img src={SocialIcons1} className="w-[30px]" alt="Facebook" />
        </div>
        <div onClick={() => openShare("linkedin")} className="cursor-pointer">
          <img src={SocialIcons2} className="w-[30px]" alt="LinkedIn" />
        </div>
        <div onClick={() => openShare("email")} className="cursor-pointer">
          <img src={SocialIcons4} className="w-[30px]" alt="Email" />
        </div>
        <div onClick={handleCopyLink} className="cursor-pointer">
          <img src={SocialIcons5} className="w-[30px]" alt="Copy link" />
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
