import { BiDetail } from "react-icons/bi";
import { FaCartShopping, FaRegStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
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
    <>
      <div className="card justify-between border p-5 relative shadow-xl w-full h-[550px]">
        <div className="absolute top-5 right-4 flex flex-col items-center justify-center gap-2">
          <button
            className="btn btn-circle btn-ghost btn-sm flex tooltip tooltip-left"
            data-tip="Favorite"
          >
            <FaRegStar className="text-lg" />
          </button>
          <Link
            to={`/details/${_id}`}
            className="btn btn-circle btn-ghost btn-sm flex tooltip tooltip-left"
            data-tip="View"
          >
            <BiDetail className="text-lg" />
          </Link>
          <button
            className="btn btn-circle btn-ghost btn-sm flex tooltip tooltip-left"
            data-tip="Share"
          >
            <IoShareSocial className="text-lg" />
          </button>
        </div>
        <img
          src={image}
          alt={name}
          className="mt-10 h-[300px] object-contain"
        />
        <div className="mt-6 px-2 text-left">
          <h1 className="text-3xl font-semibold capitalize">{name}</h1>
          <div className="flex justify-between items-center mt-5 mb-3">
            <h1 className="text-4xl font-semibold">${price}</h1>
            <button className="btn btn-outline px-8">
              <FaCartShopping className="text-lg" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
