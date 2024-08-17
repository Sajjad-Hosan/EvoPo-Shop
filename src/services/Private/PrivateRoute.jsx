import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <spam className="loading loading-dots loading-lg"></spam>
      </div>
    );
  }
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRoute;
