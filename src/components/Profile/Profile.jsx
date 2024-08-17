import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const today = new Date();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleUserLogout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleSignOut = () => {
    const userData = {
      email: user?.email,
      logoutTime: today.toLocaleTimeString(),
      logoutDate: today.toLocaleDateString(),
    };
    handleUserLogout().then(() => {
      axiosSecure.patch("/update?type=logout", userData);
      navigate("/");
      return toast.success("User Logout");
    });
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost avatar px-6">
          <div className="w-8 rounded-full">
            <img alt={user?.displayName} src={user?.photoURL} />
          </div>
          Profile
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li onClick={handleSignOut}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
