import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const [user, setUser] = useState();
  useEffect(() => {
    const newuser = JSON.parse(localStorage.getItem("user"));
    if (newuser) {
      setUser(newuser);
    }
    else{
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    }
  }, [location]);
  if (!user) {
    // auth.signOut()
    // return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};
export default PrivateRoute;
