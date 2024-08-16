import {
  FaPersonWalkingArrowRight,
  FaPersonWalkingDashedLineArrowRight,
} from "react-icons/fa6";
import RegisterPic from "../../assets/RegisterPage.svg";
import Socials from "../../components/Socials/Socials";
import { Link, useNavigate } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const today = new Date();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const imgbbKey = import.meta.env.VITE_IMGBB_KY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  const { handleUserRegister } = useAuth();
  const { register, handleSubmit } = useForm();
  //
  const handleRegister = async (e) => {
    const picture = { image: e.image[0] };
    const pictureData = await axios.post(imgbb_url, picture, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (pictureData.data?.success) {
      const PictureUrl = pictureData.data?.data?.display_url;
      const user = {
        image: PictureUrl,
        name: e.name,
        email: e.email,
        password: e.password,
        amount: 0,
        cost: 0,
        total_cost: 0,
        products: 0,
        total_products: 0,
        createTime: today.toLocaleTimeString(),
        createDate: today.toLocaleDateString(),
        logoutTime: "",
        logoutDate: "",
        loginTime: "",
        LoginDate: "",
      };
      //
      handleUserRegister(e.email, e.password)
        .then((res) => {
          updateProfile(res.user, {
            displayName: e.name,
            photoURL: PictureUrl,
          });
          axiosSecure.post("/add-user", user).then((re) => {
            console.log("mongodb", re);
          });
          navigate("/");
          return toast.success("User Register!");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="flex justify-center items-center lg:h-screen p-10 lg:p-0">
      <div className="card flex-col-reverse md:flex-row justify-between border shadow p-10 lg:h-[550px] lg:w-[1000px] gap-10">
        <div className="w-full lg:w-1/2 mt-8">
          <img src={RegisterPic} className="w-full card" />
          <div className="mt-12">
            <Socials />
          </div>
          <div className="mt-5">
            <Link to="/login" className="btn btn-outline px-5">
              <FaPersonWalkingArrowRight className="text-lg" /> Login Account
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-sm flex flex-col justify-center">
          <h1 className="text-2xl font-semibold">Hey there</h1>
          <form className="mt-3 w-full" onSubmit={handleSubmit(handleRegister)}>
            <div className="flex items-center gap-3">
              <label htmlFor="image" className="btn btn-ghost">
                <input
                  type="file"
                  name="field1"
                  id="image"
                  hidden
                  onChangeCapture={(e) => {
                    document.getElementsByName("field2")[0].value =
                      e.target.files[0]?.name || "";
                  }}
                  {...register("image", { required: true })}
                />
                <LuImagePlus className="text-lg" /> Profile Picture
              </label>
              <input type="text" className="input" name="field2" readOnly />
            </div>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-sm font-semibold">Write your Name</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-sm font-semibold">Write your Email</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
              />
            </label>
            <label className="font-semibold text-sm">
              <input type="checkbox" className="mr-2" /> Accept all terms and
              conditions
            </label>
            <div className="flex justify-end mt-7">
              <button className="btn btn-neutral px-12" type="submit">
                <FaPersonWalkingDashedLineArrowRight className="text-lg" />{" "}
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
