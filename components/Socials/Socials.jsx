import toast from "react-hot-toast";
import { FaFacebook, FaGoogle, FaXTwitter } from "react-icons/fa6";

const Socials = () => {
  return (
    <>
      <div className="flex items-center gap-6 mt-5">
        <button className="btn btn-ghost">
          <FaGoogle className="text-lg" /> Google
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => toast.error("Working on it!")}
        >
          <FaFacebook className="text-lg" /> Facebook
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => toast.error("Working on it!")}
        >
          <FaXTwitter className="text-lg" /> Twitter
        </button>
      </div>
    </>
  );
};

export default Socials;
