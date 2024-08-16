import { BiDetail } from "react-icons/bi";
import { FaCartShopping, FaRegStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

const BannerCard = ({ data, i }) => {
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
