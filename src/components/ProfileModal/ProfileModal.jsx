import {
  FaPersonWalkingDashedLineArrowRight,
  FaRegUser,
} from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";
import { FaUserCog, FaUserEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileModal = () => {
  const today = new Date();
  const { user } = useAuth();
  const navigate = useNavigate();
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
      <dialog id="profile" className="modal">
        <div className="modal-box max-w-md">
          <div className="flex items-center justify-end">
            <form method="dialog">
              <button
                className="btn btn-sm btn-ghost btn-circle flex tooltip tooltip-left"
                data-tip="Close"
              >
                <HiMiniXMark className="text-lg" />
              </button>
            </form>
          </div>
          <div className="p-5 flex flex-col items-center">
            <img
              src={user?.photoURL}
              alt=""
              className="w-52 card rounded-full mx-auto"
            />
            <div className="mt-6 text-center">
              <h1 className="text-3xl font-semibold">{user?.displayName}</h1>
              <p className="text-sm font-semibold mt-1">{user?.email}</p>
              <div className="mt-8 flex items-center gap-5">
                <button
                  className="btn btn-ghost btn-circle flex tooltip"
                  data-tip="Manage Profile"
                >
                  <FaUserCog className="text-lg" />
                </button>
                <button
                  className="btn btn-ghost btn-circle flex tooltip"
                  data-tip="Update Profile"
                >
                  <FaUserEdit className="text-lg" />
                </button>
                <button
                  className="btn btn-error btn-circle flex tooltip"
                  data-tip="Logout"
                  onClick={handleSignOut}
                >
                  <FaPersonWalkingDashedLineArrowRight className="text-lg" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileModal;
