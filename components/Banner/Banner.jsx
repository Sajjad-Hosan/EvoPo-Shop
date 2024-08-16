import { BiDetail } from "react-icons/bi";
import { FaCartShopping, FaRegStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const Banner = () => {
  return (
    <>
      <div
        className="hero h-[550px] mt-10 card max-w-screen-xl mx-auto relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="card absolute md:right-5 md:bottom-5 right-2 bottom-2 border p-6 w-[350px] md:w-[500px] bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-semibold">Black Coffee</h1>
            <h1 className="text-xl md:text-3xl font-semibold">$69</h1>
          </div>
          <p className="text-sm md:text-md my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt est
            rerum impedit maiores! Temporibus velit quos, et maiores vero
            eligendi.
          </p>
          <div className="flex justify-end items-center gap-5">
            <button
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="Add Cart"
            >
              <FaCartShopping className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="Favorite"
            >
              <FaRegStar className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="View"
            >
              <BiDetail className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="Share"
            >
              <IoShareSocial className="text-lg" />
            </button>
          </div>
        </div>
        <div className="absolute left-5 bottom-5 flex flex-col md:flex-row items-center gap-5">
          <button
            className="btn btn-circle btn-ghost text-neutral-content flex tooltip"
            data-tip="Prev"
          >
            <GrFormPreviousLink className="text-xl" />
          </button>
          <button
            className="btn btn-circle btn-ghost text-neutral-content flex tooltip"
            data-tip="Next"
          >
            <GrFormNextLink className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
