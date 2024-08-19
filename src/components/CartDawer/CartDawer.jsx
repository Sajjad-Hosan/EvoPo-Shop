import { BiDetail } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCartShopping } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import noProduct from "../../assets/no_data.svg";


const DrawerCard = ({ data }) => {
  const axiosSecure = useAxiosSecure();
  const handleRemoveCart = async (id) => {
    const res = await axiosSecure.delete(`/cart-remove/${id}`);
    console.log(res.data);
  };
  return (
    <>
      <div className="card border relative p-3 h-[190px]">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-[55%] object-contain my-auto mx-auto"
        />
        <div className="flex justify-end gap-2 -mt-5">
          <Link
            to={`/details/${data?._id}`}
            className="btn btn-circle btn-ghost btn-sm flex tooltip"
            data-tip="View"
          >
            <BiDetail className="text-md" />
          </Link>
          <button
            onClick={() => handleRemoveCart(data?._id)}
            className="btn btn-sm btn-ghost btn-circle flex tooltip"
            data-tip="Remove"
          >
            <FaTrashAlt className="text-md" />
          </button>
        </div>
      </div>
    </>
  );
};

const CartDawer = () => {
  const { user, setCartCount } = useAuth();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const numberOfpages = Math.ceil(count / 8);
  const axiosSecure = useAxiosSecure();

  const fetchData = useCallback(() => {
    axiosSecure
      .post(`/carts?email=${user?.email}&page=${page}&item=${8}`)
      .then((res) => {
        setData(res.data?.result);
        setCount(res.data?.count);
        setCartCount(res.data?.count);
      });
  }, [axiosSecure, page, user?.email, setCartCount]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div className="drawer w-14">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </label>
        </div>
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-5 h-full w-96 bg-base-100 card overflow-hidden relative">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <FaCartShopping />
              Products
            </h2>
            {data.length <= 0 ? (
              <div className="card border my-auto overflow-hidden">
                <img src={noProduct} alt="" className="pt-1" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-2 my-7 overflow-scroll text-center">
                {data.map((item, i) => (
                  <DrawerCard key={i} data={item} />
                ))}
              </div>
            )}
            <div className="py-5 bg-transparent"></div>
            <div className="absolute left-0 bottom-0 w-full mt-2 flex justify-between items-center py-4 px-4">
              <button className="btn btn-neutral px-8">
                <CiLocationArrow1 className="text-lg" /> Buy now
              </button>
              {numberOfpages <= 1 ? (
                ""
              ) : (
                <div className="flex justify-end items-center join">
                  <button
                    className="btn btn-sm btn-ghost btn-circle join-item flex tooltip tooltip-bottom"
                    data-tip="Prev"
                    onClick={() =>
                      setPage((current) =>
                        current <= 0 ? current : current - 1
                      )
                    }
                  >
                    <GrFormPreviousLink className="text-lg" />
                  </button>
                  <span className="font-semibold px-3">Page {page}</span>
                  <button
                    className="btn btn-sm btn-ghost btn-circle join-item flex tooltip tooltip-bottom"
                    data-tip="Next"
                    onClick={() =>
                      setPage((current) =>
                        current >= numberOfpages - 1 ? current : current + 1
                      )
                    }
                  >
                    <GrFormNextLink className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDawer;
