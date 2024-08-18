import { BiDetail } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import {
  IoCartOutline,
  IoChevronBackOutline,
  IoShareSocial,
} from "react-icons/io5";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
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
          <div className="w-full flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-end gap-4">
            <button
              className="btn btn-circle btn-ghost btn-sm md:btn-md flex tooltip tooltip-left lg:tooltip-top"
              data-tip="Favorite"
            >
              <FaRegStar className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost btn-sm md:btn-md flex tooltip tooltip-left lg:tooltip-top"
              data-tip="Share"
            >
              <IoShareSocial className="text-lg" />
            </button>
          </div>
          <div className="mt-10 p-3">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold">{name}</h1>
              <h1 className="text-2xl font-semibold">${price}</h1>
            </div>
            <p className="mt-5 text-sm font-semibold leading-relaxed">
              {description}
            </p>
            <div className="flex items-center justify-end gap-6 mt-14">
              <button className="btn btn-neutral px-8">
                <IoCartOutline className="text-lg" /> Add to cart
              </button>
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
