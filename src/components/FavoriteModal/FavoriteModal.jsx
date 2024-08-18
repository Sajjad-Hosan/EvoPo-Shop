import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { HiMiniXMark } from "react-icons/hi2";
import { MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import noProduct from "../../assets/no_product.svg";

const FavoriteCard = ({ data, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete = async (id, pro_id) => {
    const res = await axiosSecure.delete(
      `/favorite-delete/?id=${id}&productId=${pro_id}`
    );
    refetch();
  };
  return (
    <>
      <div className="card justify-between border p-5">
        <img
          src={data?.item?.image}
          alt=""
          className="w-[70%] mx-auto my-auto"
        />
        <div className="mt-2 flex items-center gap-3 justify-center">
          <button
            onClick={() => handleDelete(data._id, data.item._id)}
            className="btn btn-sm btn-circle btn-ghost flex tooltip"
            data-tip="unFavorite"
          >
            <MdOutlineFavorite className="text-lg" />
          </button>
          <Link
            to={`/details/${data?.item?._id}`}
            className="btn btn-circle btn-ghost btn-sm flex tooltip"
            data-tip="View"
          >
            <BiDetail className="text-lg" />
          </Link>
          <button
            className="btn btn-circle btn-ghost btn-sm flex tooltip"
            data-tip="Add to Cart"
          >
            <FaCartShopping className="text-lg" />
          </button>
        </div>
      </div>
    </>
  );
};

const FavoriteModal = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const numberOfpages = Math.ceil(count / 6);
  const fetchData = useCallback(async () => {
    const res = await axiosSecure.post(
      `/favorites?user=${user?.email}&page=${page}&item=${6}`
    );
    setData(res.data.result);
    setCount(res.data.count);
  }, [axiosSecure, page, user?.email]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <dialog id="favorite" className="modal">
        <div className="modal-box max-w-5xl">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Favorite</h3>
            <div className="flex items-center gap-4">
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
              <form method="dialog">
                <button
                  className="btn btn-sm btn-ghost btn-circle flex tooltip tooltip-bottom"
                  data-tip="Close"
                >
                  <HiMiniXMark className="text-lg" />
                </button>
              </form>
            </div>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.length <= 0 ? (
                <div className="card border p-3">
                  <img src={noProduct} alt="" />
                </div>
              ) : (
                data.map((item, i) => (
                  <FavoriteCard key={i} data={item} refetch={fetchData} />
                ))
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FavoriteModal;
