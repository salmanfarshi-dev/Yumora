import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

function Searchbar() {
  let [Apidata, setApiData] = useState([]);
  let [search, setSearch] = useState([]);
  const cartRef = useRef(null);
  const data = useSelector((state) => state.cartitem.cartvalue);
  const data2 = useSelector((state) => state.Wishlist.value);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setApiData(data.products));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
    let alldata = Apidata.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setSearch(alldata);
  };

  const handleIncrement = (item) => {
    dispatch(incrementcart(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementcart(item));
  };
  const handledeletecart = (item) => {
    dispatch(deletecart(item));
  };

  let dispatch = useDispatch();
  const [dropdown, setDrodown] = useState(false);
  const [carddropdown, setCardDropDown] = useState(false);

  const handleBreadcrumb = (name) => {
    dispatch(addbradcrumb(name));
  };

  let total = 0;

  data.forEach((item) => {
    total += item.price * item.quantity;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCardDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-360 px-4 md:px-6 lg:px-0 mx-auto py-3 md:py-5">
        <div className="flex justify-between items-center">
          <p className="text-black text-[15px]md:text-xl hidden md:block md:flex gap-x-3 items-center">
            {" "}
            <MdOutlineLocalPhone /> +123 ( 456 ) ( 7890 )
          </p>

          <div className="flex items-center border border-border1 pr-2 relative md:w-80 rounded-xl">
            <input
              type="text"
              placeholder="Search for items...."
              className=" px-2 py-2 md:py-3 focus:outline-0 w-[80%] md:w-65 text-xs md:text-[16px]"
            />
            <div className="bg-primary absolute right-0 h-full text-white text-[15px] w-8 flex justify-center items-center rounded-r">
              <FiSearch />
            </div>
          </div>

          <div className="flex items-center gap-x-3 lg:gap-x-8">
            <div className="flex items-center gap-x-2 text-[15px] font-medium text-black cursor-pointer">
              <MdOutlineAccountCircle className="size-6" />
              <span className="hidden md:block">Account</span>
            </div>
            <Link to="wishlist">
              <div className="flex items-center gap-x-2 text-[15px] font-medium text-black cursor-pointer">
                <FaRegHeart className="size-6" />

                <span className="hidden md:block">Wishlist</span>
              </div>
            </Link>
            <Link>
              <div
                onClick={() => setCardDropDown(!carddropdown)}
                className="flex items-center gap-x-2 text-[15px] font-medium text-black cursor-pointer relative"
              >
                <BsCart3 className="size-6" />
                <span className="hidden md:block">Cart</span>

                {carddropdown && (
                  <div
                    ref={cartRef}
                    onClick={() => setCardDropDown(!carddropdown)}
                    className="absolute top-10 md:w-100 z-20 -left-75 bg-gray-400 rounded-[10px] py-4 h-[78vh]"
                  >
                    <ul className="grid grid-cols-12   pb-3 px-3  text-white font-semibold text-sm border-b">
                      <li className="col-span-3">Image</li>
                      <li className="col-span-3">Name</li>
                      <li className="col-span-3"> Quantity</li>
                      <li className="col-span-3">Subtotal</li>
                    </ul>
                    <div className="flex flex-col gap-y-3 w-full h-[65vh] scroll overflow-y-auto hide-scrollbar">
                      {data &&
                        data.map((item) => (
                          <ul
                            key={item.id}
                            className="grid grid-cols-12  mt-4 px-3  text-white font-normal text-xs items-center"
                          >
                            <li className="col-span-3 relative">
                              <img
                                src={item.image}
                                alt=""
                                className="w-16 h-16 object-cover "
                              />
                              <button
                                onClick={() => handledeletecart(item)}
                                className="w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 absolute top-0 left-0"
                              >
                                <IoClose className="text-2xl" />
                              </button>
                            </li>
                            <li className="col-span-3 w-20 truncate">
                              {item.tittle}
                            </li>
                            <li className="col-span-3 border border-white px-3 py-1 w-fit mx-auto">
                              <button
                                onClick={() => handleDecrement(item)}
                                className="mr-2"
                              >
                                -
                              </button>
                              <button>{item.quantity}</button>
                              <button
                                onClick={() => handleIncrement(item)}
                                className="ml-2"
                              >
                                +
                              </button>
                            </li>
                            <li className="col-span-3 w-20 truncate">
                              $ {item.price * item.quantity}
                            </li>
                          </ul>
                        ))}

                      <h5 className="text-white font-semibold font-sans absolute right-4 bottom-3 ">
                        Total: $ {total}
                      </h5>

                      {data && data.length > 0 ? (
                        <div className="flex gap-x-3 justify-center pt-4">
                          <Link to="/card">
                            <button className="text-white bg-red-500 py-2 px-8 rounded">
                              Cart
                            </button>
                          </Link>
                          <Link to="/checkout">
                            <button className="text-white bg-red-500 py-2 px-8 rounded">
                              Checkout
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <h1 className="text-white h-full font-semibold flex justify-center items-center text-2xl">
                          Cart Empty
                        </h1>
                      )}
                    </div>
                  </div>
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
