import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Reducers/authSlice/authSlice";
import Swal from "sweetalert2";

function ProtectiveRoute({ component }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const Status = localStorage.getItem("status");
  const profileComplete = localStorage.getItem("ProfileComplete");
  const ApiKey = import.meta.env.VITE_API_KEY;

  const { loading } = useSelector((state) => state.auth);
  const [localLoading, setLocalLoading] = useState(true);
  const [modalHandled, setModalHandled] = useState(false); // prevent multiple modals

  // Fetch user if token exists
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [dispatch, token, ApiKey, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else if (!loading && !modalHandled) {
      setModalHandled(true); 

      if (profileComplete !== "true" && location.pathname !== "/admin/account-setting") {
        navigate("/admin/account-setting");
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Please complete your profile to access this feature.",
          iconColor: "#703BF7",
          background: "#1E1E1E",
          color: "#f5f5f5",
          confirmButtonColor: "#703BF7",
          allowOutsideClick: false,
        });
        setLocalLoading(false);
        return;
      }

      
      // Restricted pages
      const restrictedRoutes = [
        "/admin/customer-support",
        "/admin/network",
        "/admin/inbox",
        "/admin/myoffers",
        "/admin/analytics",
        "/admin/inquiry",
      ];
      

      if (Status !== "active" && restrictedRoutes.includes(location.pathname.toLowerCase())) {
        Swal.fire({
          title: "Upgrade Required",
          text: "You need an active plan to access this feature.",
          icon: "warning",
          iconColor: "#703BF7",
          showCancelButton: true,
          confirmButtonText: "Upgrade",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#703BF7",
          background: "#1E1E1E",
          color: "#f5f5f5",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/pricing"); 
          } else {
            const from = location.state?.from || "/admin";
            navigate(from, { replace: true });
          }
        });

        return; // Stop rendering until modal resolved
      }

      setLocalLoading(false);
    }
  }, [loading, profileComplete, location.pathname, Status, token, navigate, modalHandled]);

  if (localLoading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "45%",
          top: "50%",
          zIndex: "1000",
        }}
      >
        <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
      </div>
    );
  }

  return component;
}

export default ProtectiveRoute;
