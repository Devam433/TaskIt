import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
  const currentUser = useSelector(state=>state.auth);
  const location = useLocation()

    if (!currentUser?.isActive) {
     return <Navigate to={'/signin'} state={{from:location}} replace/>
    }
  
  return (
    <>
      {children}
    </>
  );
};