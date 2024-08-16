import {
  FaPersonWalkingArrowRight,
  FaPersonWalkingDashedLineArrowRight,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CartBtn from "../CartBtn/CartBtn";
import Profile from "../Profile/Profile";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <img src="/public/log.png" alt="" className="w-10" /> EcoPo Shop
          </a>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end space-x-3">
          {user ? (
            <>
              <CartBtn />
              <Profile/>
            </>
          ) : (
            <>
              <Link className="btn btn-outline px-8" to="/login">
                <FaPersonWalkingArrowRight className="text-lg" /> Login
              </Link>
              <Link className="btn btn-outline px-8" to="/register">
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
