import { BiDetail } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaMinus, FaPlus, FaRegStar, FaStar } from "react-icons/fa6";
import {
  IoBagRemoveOutline,
  IoCartOutline,
  IoChevronBackOutline,
  IoShareSocial,
} from "react-icons/io5";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const DetailsPage = () => {
  const { user } = useAuth();
  const today = new Date();
  const data = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [quentity, setQuentity] = useState(1);
  const {
    _id,
    name,
    image,
    description,
    price,
    category,
    ratings,
    creation_date,
    creation_time,
  } = data;
  // const handleBuyNow = async(item) => {
  //   const product = {
  //     product: {
  //       ...item,
  //     },
  //   };
  //   //
  //   // const res = await axiosSecure.post('/')
  // };
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
      customer_name: user?.displayName,
      customer_email: user?.email,
      quantity: 1,
      total_price: 0,
      product_id: item?._id,
      ...item,
      cart: true,
      cart_add_date: today.toLocaleDateString(),
      cart_add_time: today.toLocaleTimeString(),
    };
    const res = await axiosSecure.post("/cart-add", cart);
    console.log(res);
  };
  const handleRemoveCart = async (item) => {
    const cart = {
      pro_id: item._id,
      cart: false,
    };
    //
    const res = await axiosSecure.patch("/cart-remove", cart);
    console.log(res);
  };
  return (
    <div className="flex justify-center items-center lg:h-screen">
      <div className="p-10 md:card flex-col lg:flex-row justify-between items-center md:border lg:w-[1100px] lg:h-[550px]">
        <div className="w-full lg:w-1/2 h-full flex justify-center items-center relative">
          <button
            className="btn btn-ghost absolute -top-5 -left-5"
            onClick={() => navigate(-1)}
          >
            <IoChevronBackOutline className="text-lg" /> Back
          </button>
          <img src={image} alt="" className="w-[400px] object-cover" />
        </div>
        <div className="w-full lg:w-1/2 relative h-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <button
                className="btn btn-circle btn-ghost"
                onClick={() => setQuentity((c) => (c <= 1 ? c : c - 1))}
              >
                <FaMinus className="text-lg" />
              </button>
              <button
                className="btn btn-circle btn-ghost"
                onClick={() => setQuentity((c) => (c >= 10 ? c : c + 1))}
              >
                <FaPlus className="text-lg" />
              </button>
              <div className="btn btn-neutral px-8 hover:bg-none">
                Product : {quentity <= 9 ? "0" + quentity : quentity}
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-end gap-4">
              {data?.favorite ? (
                <button
                  onClick={() =>
                    toast.success("Go to Favorite Modal to delete it")
                  }
                  className="btn btn-circle btn-ghost btn-sm md:btn-md flex tooltip tooltip-left"
                  data-tip="unFavorite"
                >
                  <FaStar className="text-lg" />
                </button>
              ) : (
                <button
                  onClick={() => handleFavorite(true, data)}
                  className="btn btn-circle btn-sm md:btn-ghost flex tooltip tooltip-left"
                  data-tip="Favorite"
                >
                  <FaRegStar className="text-lg" />
                </button>
              )}
              <button
                className="btn btn-circle btn-ghost btn-sm md:btn-md flex tooltip tooltip-left lg:tooltip-top"
                data-tip="Share"
              >
                <IoShareSocial className="text-lg" />
              </button>
            </div>
          </div>
          <div className="mt-10 p-3">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold">{name}</h1>
              <h1 className="text-2xl font-semibold">${price}</h1>
            </div>
            <p className="mt-5 text-sm font-semibold leading-relaxed">
              {description}
            </p>
            <div className="flex items-center justify-end gap-3 mt-14">
              {data.cart ? (
                <button
                  className="btn btn-neutral px-8"
                  onClick={() => handleRemoveCart(data)}
                >
                  <IoBagRemoveOutline className="text-lg" /> Remove Product
                </button>
              ) : (
                <button
                  className="btn btn-neutral px-8"
                  onClick={() => handleAddCart(data)}
                >
                  <IoCartOutline className="text-lg" /> Add to cart
                </button>
              )}

              <button className="btn btn-outline px-8">
                <CiLocationArrow1 className="text-lg" /> Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
