import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import {
  FaPersonWalkingDashedLineArrowRight,
  FaRegUser,
} from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import ProfileModal from "../ProfileModal/ProfileModal";
import FavoriteModal from "../FavoriteModal/FavoriteModal";

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
      <ProfileModal />
      <FavoriteModal/>
      {/*  */}
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
            <button
              className="py-2"
              onClick={() => document.getElementById("profile").showModal()}
            >
              <FaRegUser className="text-lg mr-2" /> Profile
            </button>
          </li>
          <li>
            <button
              className="py-2"
              onClick={() => document.getElementById("favorite").showModal()}
            >
              <MdFavoriteBorder className="text-lg mr-2" /> Favorite
            </button>
          </li>
          <li>
            <Link className="py-2">
              <GoGear className="text-lg mr-2" /> Settings
            </Link>
          </li>
          <li onClick={handleSignOut}>
            <button className="py-2">
              <FaPersonWalkingDashedLineArrowRight className="text-lg mr-2" />{" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
