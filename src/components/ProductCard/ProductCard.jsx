import { BiDetail } from "react-icons/bi";
import { FaCartShopping, FaRegStar, FaStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ProductCard = ({ data, refetch }) => {
  const today = new Date();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
    console.log(res.data);
    refetch();
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
  return (
    <>
      <div className="card justify-between border p-5 relative shadow-xl w-full h-[550px]">
        <div className="absolute top-5 right-4 flex flex-col items-center justify-center gap-2">
          {data?.favorite ? (
            <button
              onClick={() => handleFavorite(false, data)}
              className="btn btn-circle btn-ghost btn-sm flex tooltip tooltip-left"
              data-tip="unFavorite"
            >
              <FaStar className="text-lg" />
            </button>
          ) : (
            <button
              onClick={() => handleFavorite(true, data)}
              className="btn btn-circle btn-ghost btn-sm flex tooltip tooltip-left"
              data-tip="Favorite"
            >
              <FaRegStar className="text-lg" />
            </button>
          )}

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
            {data.cart ? (
              <Link to={`/details/${_id}`} className="btn btn-neutral px-8">
                <BiDetail className="text-lg" /> View
              </Link>
            ) : (
              <button
                className={`btn px-8 btn-outline`}
                onClick={() => handleAddCart(data)}
              >
                <FaCartShopping className="text-lg" /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
