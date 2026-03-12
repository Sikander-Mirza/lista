// UserGetRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Reducers/authSlice/authSlice";
import Spinner from "../../Components/Spinner/Spinner";

function UserGetRoute({ component }) {
  const token = localStorage.getItem("token");
  const ApiKey = import.meta.env.VITE_API_KEY;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [localLoading, setLocalLoading] = useState(true);
   


  useEffect(() => {
    if (token) {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [token, ApiKey, dispatch]);

  useEffect(() => {
    if (!loading) setLocalLoading(false);
  }, [loading]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (localLoading) {
    return (
      <div style={{ position: "absolute", left: "45%", top: "50%", zIndex: 999 }}>
        <Spinner style={"w-14 h-20 text-PurpleColor"} />
      </div>
    );
  }

  return component;
}

export default UserGetRoute;
