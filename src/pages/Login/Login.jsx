import {
  FaPersonWalkingArrowRight,
  FaPersonWalkingDashedLineArrowRight,
} from "react-icons/fa6";
import LoginPic from "../../assets/LoginPage.svg";
import Socials from "../../components/Socials/Socials";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const today = new Date();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { handleUserLogin } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleLogin = (e) => {
    const userData = {
      email: e.email,
      loginTime: today.toLocaleTimeString(),
      LoginDate: today.toLocaleDateString(),
    };
    handleUserLogin(e.email, e.password).then((res) => {
      console.log("login res", res);
      axiosSecure.patch("/update?type=login", userData).then(() => {
        navigate("/");
        return toast.success("User Login");
      });
    });
  };
  return (
    <div className="flex justify-center items-center lg:h-screen lg:p-0 p-10">
      <div className="card flex-col md:flex-row justify-between border shadow p-10 lg:h-[550px] lg:w-[1000px] gap-10">
        <img src={LoginPic} className="w-[400px] card" />

        <div className="lg:w-1/2 max-w-sm flex flex-col justify-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <form className="mt-6 w-full" onSubmit={handleSubmit(handleLogin)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-sm font-semibold">Write your Email</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email")}
              />
            </label>
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="text-sm font-semibold">
                  Write your Password
                </span>
              </div>
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password")}
              />
            </label>
            <a href="#" className="text-sm font-semibold">
              Forgot password ?
            </a>
            <div className="flex justify-end mt-7">
              <button className="btn btn-neutral px-12" type="submit">
                <FaPersonWalkingArrowRight className="text-lg" /> Login
              </button>
            </div>
          </form>
          <Socials />
          <div className="mt-7">
            <Link to="/register" className="btn btn-outline px-5">
              <FaPersonWalkingDashedLineArrowRight className="text-lg" /> Create
              Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
