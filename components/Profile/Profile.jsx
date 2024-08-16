import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const today = new Date();
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
      axiosSecure.patch("/update?type=logout", userData).then(() => {
        return toast.success("User Logout");
      });
    });
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost avatar px-6">
          <div className="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
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
