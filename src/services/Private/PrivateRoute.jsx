import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <spam className="loading loading-dots loading-lg"></spam>
      </div>
    );
  } else return <>{children}</>;
};

export default PrivateRoute;
