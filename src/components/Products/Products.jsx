import { FaStar } from "react-icons/fa6";
import ProductCard from "../ProductCard/ProductCard";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Products = ({ count }) => {
  const { setProducts } = useAuth();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(0);
  const numberOfPage = Math.ceil(count / 9);
  //
  const fetchData = useCallback(async () => {
    const res = await axiosSecure.post(
      `/products?page=${page}&item=9&search=${search}&category=${category}&sort=${sort}`
    );
    setData(res?.data);
    setProducts(res?.data);
  }, [axiosSecure, page, search, category, sort, setProducts]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="mt-16 text-center max-w-screen-xl mx-auto">
      <h1 className="text-5xl font-semibold">Our Products</h1>
      <p className="text-center mt-2 font-semibold w-11/12 mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        dicta exercitationem, minima fugit, cum esse ipsam sed commodi vel
        doloremque repellat maiores, ea placeat debitis totam quibusdam aliquam
        cumque voluptates!
      </p>
      <div className="flex flex-col mt-20">
        <div className="mx-auto lg:w-full flex flex-col gap-5 lg:flex-row lg:justify-between items-center">
          <div className=" join flex flex-row">
            <input
              type="text"
              placeholder="Product Name"
              id="search-box"
              className="input input-bordered join-item w-80"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              className="join-item btn btn-neutral px-8"
              onClick={() => {
                setSearch(document.getElementById("search-box").value);
              }}
            >
              <IoMdSearch className="text-lg" /> Search
            </button> */}
          </div>
          <div className="w-full flex lg:justify-end items-center gap-7">
            <select
              className="select select-bordered w-full md:w-60"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected disabled>
                Category
              </option>
              <option value="category" selected>
                Category Name
              </option>
              <option value="name">Branch Name</option>
              <option value="price">Price Name</option>
            </select>
            {/* ----------------------------------- */}
            <select
              className="select select-bordered w-full md:w-60"
              onChange={(e) => setSort(e.target.value)}
            >
              <option selected disabled>
                Sort by
              </option>
              <option value="new">Newest</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, i) => (
            <ProductCard key={i} data={item} refetch={fetchData} />
          ))}
        </div>
        <div className="flex justify-center items-center w-full mt-16 join">
          <button
            className="btn btn-ghost px-6 join-item "
            onClick={() =>
              setPage((current) => (current <= 0 ? current : current - 1))
            }
          >
            <GrFormPreviousLink className="text-lg" /> Prev
          </button>
          <span className="border border-neutral rounded-lg py-3 px-12 font-semibold">
            Page {page}
          </span>
          <button
            className="btn btn-ghost px-6 join-item "
            onClick={() =>
              setPage((current) =>
                current >= numberOfPage - 1 ? current : current + 1
              )
            }
          >
            Next
            <GrFormNextLink className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
