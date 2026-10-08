import React, { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { Link } from "react-router";
import { useSelector } from "react-redux";

function Searchbar() {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState("");

  // Cart
  const cartItems = useSelector(
    (state) => state.cart?.cartItems || []
  );

  // Wishlist
  const wishlistItems = useSelector(
    (state) => state.Wishlist?.value || []
  );

  // Get products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.products || []);
      })
      .catch((error) => {
        console.log("Product fetch error:", error);
      });
  }, []);

  // Search
  const handleInput = (e) => {
    const value = e.target.value;

    setInput(value);

    if (!value.trim()) {
      setSearch([]);
      return;
    }

    const filteredProducts = apiData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearch(filteredProducts);
  };

  // Cart quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <section className="bg-white">
      <div className="max-w-360 px-4 md:px-6 lg:px-0 mx-auto py-3 md:py-5">
        <div className="flex justify-between items-center">
          
          {/* Phone */}
          <p className="text-black text-[15px] md:text-xl hidden md:flex gap-x-3 items-center">
            <MdOutlineLocalPhone />
            +123 ( 456 ) ( 7890 )
          </p>

          {/* Search */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 pr-2 relative md:w-80 rounded-xl overflow-hidden">
              
              <input
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="Search for items...."
                className="px-2 py-2 md:py-3 focus:outline-none w-full text-xs md:text-[16px]"
              />

              {/* Clear */}
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setSearch([]);
                  }}
                  className="mr-2 text-gray-400 hover:text-black"
                >
                  <IoClose size={18} />
                </button>
              )}

              {/* Search Icon */}
              <div className="bg-primary text-white text-[15px] w-10 h-full min-h-10 flex justify-center items-center">
                <FiSearch />
              </div>
            </div>

            {/* Search Result */}
            {input && (
              <div className="absolute z-50 top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto">
                {search.length > 0 ? (
                  search.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100"
                      onClick={() => {
                        setInput("");
                        setSearch([]);
                      }}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-contain rounded-lg"
                      />

                      <div>
                        <h4 className="text-sm font-medium text-gray-800">
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-500">
                          ${item.price}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-x-3 lg:gap-x-8">

            {/* Account */}
            <div className="flex items-center gap-x-2 text-[15px] font-medium text-black cursor-pointer">
              <MdOutlineAccountCircle className="size-6" />

              <span className="hidden md:block">
                Account
              </span>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist">
              <div className="relative flex items-center gap-x-2 text-[15px] font-medium text-black">
                <FaRegHeart className="size-6" />

                <span className="hidden md:block">
                  Wishlist
                </span>

                {wishlistItems.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link to="/card">
              <div className="relative flex items-center gap-x-2 text-[15px] font-medium text-black">
                <BsCart3 className="size-6" />

                <span className="hidden md:block">
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Searchbar;