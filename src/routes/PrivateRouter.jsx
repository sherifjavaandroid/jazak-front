import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRouter({ children }) {
  //TODO:WE WILL CHECK IF TOKEN EXIST OR not
  const { email } = useSelector((state) => state.auth);
  const location = useLocation();
  if (email) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRouter;
