import { BiDetail } from "react-icons/bi";
import { FaCartShopping, FaRegStar, FaStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BannerCard = ({ data, i }) => {
  const today = new Date();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  //
  const handleFavorite = async (action, item) => {
    const product = {
      favo_id: data?._id,
      name: user?.displayName,
      email: user?.email,
      image: user?.displayURL,
      favorite: action,
      favorite_date: today.toLocaleDateString(),
      favorite_time: today.toLocaleTimeString(),
      item: {
        ...item,
        favorite: action,
      },
    };
    // handle favorite action
    const res = await axiosSecure.post("/favorite-add", product);
    navigate(0);
    console.log(res.data);
  };
  const handleAddCart = async (item) => {
    const cart = {
      cart_add_date: today.toLocaleDateString(),
      cart_add_time: today.toLocaleTimeString(),
      product: {
        ...item,
        cart: true,
      },
    };
    const res = await axiosSecure.post("/cart-add", cart);
    navigate(0);
  };
  return (
    <>
      <div id={`slide${i}`} className="carousel-item relative w-full">
        <img src={data?.image} className="w-full card object-contain" />
        <div className="card absolute md:right-5 md:bottom-5 right-2 bottom-2 border p-6 w-[350px] md:w-[500px] bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-semibold capitalize">
              {data?.name}
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold">
              ${data?.price}
            </h1>
          </div>
          <p className="text-sm md:text-md my-3">
            {data?.description.slice(0, 102)}
          </p>
          <div className="flex justify-end items-center gap-3">
            {data.cart ? (
              ""
            ) : (
              <button
                className={`btn btn-ghost btn-circle btn-sm flex tooltip`}
                onClick={() => handleAddCart(data)}
                data-tip="Add to Cart"
              >
                <FaCartShopping className="text-lg" />
              </button>
            )}
            {data?.favorite ? (
              <button
                onClick={() =>
                  toast.success("Go to Favorite Modal to delete it")
                }
                className="btn btn-circle btn-ghost btn-sm md:btn-md flex tooltip"
                data-tip="unFavorite"
              >
                <FaStar className="text-lg" />
              </button>
            ) : (
              <button
                onClick={() => handleFavorite(true, data)}
                className="btn btn-circle btn-sm md:btn-ghost flex tooltip"
                data-tip="Favorite"
              >
                <FaRegStar className="text-lg" />
              </button>
            )}
            <Link
              to={`/details/${data?._id}`}
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="View"
            >
              <BiDetail className="text-lg" />
            </Link>
            <button
              className="btn btn-circle btn-ghost btn-sm flex tooltip"
              data-tip="Share"
            >
              <IoShareSocial className="text-lg" />
            </button>
          </div>
        </div>
        <div className="absolute left-5 bottom-5 flex flex-col md:flex-row items-center gap-5">
          <a href={`#slide${i - 1}`} className="btn btn-circle btn-neutral">
            <GrFormPreviousLink className="text-xl" />
          </a>
          <a href={`#slide${i + 1}`} className="btn btn-circle btn-neutral">
            <GrFormNextLink className="text-xl" />
          </a>
        </div>
      </div>
    </>
  );
};

const Banner = () => {
  const { products } = useAuth();
  return (
    <div className="max-w-screen-xl h-[550px] flex mx-auto mt-10">
      <div className="carousel w-full border rounded-xl">
        {products.map((data, index) => (
          <BannerCard key={index} data={data} i={index} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
