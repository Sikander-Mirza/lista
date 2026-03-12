// src/Components/AlertModal/AlertModal.js
import Swal from "sweetalert2";

const AlertModal = ({ icon, title, text ,timer }) => {
  return Swal.fire({
    icon: icon || "success",
    title: title || "Alert",
    text: text || "",
    background: "#1E1E1E",
    color: "#f5f5f5",
    position: "center",
    showConfirmButton: false,
    timer: timer || 2000,
    padding: "2px 10px 40px 10px",
    customClass: {
      title: "text-white font-Urbanist font-semibold text-[25px]",
      htmlContainer: "text-white text-[14px] font-Urbanist",
    },
  });
};

export default AlertModal;
