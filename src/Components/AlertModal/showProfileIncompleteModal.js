import Swal from "sweetalert2";

const showProfileIncompleteModal = () => {
  return Swal.fire({
    icon: "warning",
    title: "Profile Incomplete",
    text: "Please complete your profile before upgrading.",
    background: "#0F0F0F",
    color: "#ffffff",
    showCancelButton: true,
    confirmButtonText: "Go to Profile",
    cancelButtonText: "Cancel",
    position: "center",
    padding: "20px 20px 40px 20px",

    // BUTTON STYLES
    customClass: {
      popup: "rounded-xl",
      title: "text-white font-Urbanist font-semibold text-[25px]",
      htmlContainer: "text-white text-[14px] font-Urbanist",
      confirmButton:
        "!bg-purple-600 hover:bg-purple-700 text-white font-Urbanist px-6 py-2 mr-2 rounded-lg",
      cancelButton:
        "bg-white text-black font-Urbanist px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-200",
    },

    // REMOVE DEFAULT BUTTON STYLING
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/admin/account-setting"; 
    }
  });
};


export default showProfileIncompleteModal;