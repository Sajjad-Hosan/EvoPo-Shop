import {
  FaPersonWalkingArrowRight,
  FaPersonWalkingDashedLineArrowRight,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Profile from "../Profile/Profile";
import CartDawer from "../CartDawer/CartDawer";
import logo from "../../../public/log.png";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <img src={logo} alt="" className="w-10" /> EcoPo Shop
          </a>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end space-x-3">
          {user ? (
            <>
              <CartDawer />
              <Profile />
            </>
          ) : (
            <>
              <Link className="btn btn-outline px-5 md:px-8" to="/login">
                <FaPersonWalkingArrowRight className="text-lg" /> Login
              </Link>
              <Link className="btn btn-neutral px-5 md:px-8" to="/register">
                <FaPersonWalkingDashedLineArrowRight className="text-lg" />{" "}
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
