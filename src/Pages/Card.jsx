import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router";
import { Button } from "@heroui/react";

import {
  incrementcart,
  decrementcart,
  deletecart,
} from "../Slices/addtocartSlice";

import { useDispatch, useSelector } from "react-redux";

function Card() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  // Redux থেকে cart data নেওয়া
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products))
      .catch((error) => console.log(error));
  }, []);

  const handleIncrement = (item) => {
    dispatch(incrementcart(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementcart(item));
  };

  const handleDelete = (item) => {
    dispatch(deletecart(item));
  };

  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * (item.quantity || 1);
  });

  return (
    <section className="mb-4 md:mb-10 lg:mb-14">
      <PageBreadcrumb title="Cart" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12 mb-5 md:mb-10 lg:mb-15">

        {/* Cart Header */}
        <div className="bg-border2 mt-5 md:mt-10 lg:mt-14 rounded">

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] items-center p-2 md:p-5">

            <div className="text-xs md:text-sm lg:text-[15px] font-semibold font-quicksand">
              Product
            </div>

            <div className="text-xs md:text-sm lg:text-[15px] font-semibold font-quicksand">
              Price
            </div>

            <div className="text-xs md:text-sm lg:text-[15px] font-semibold font-quicksand">
              Quantity
            </div>

            <div className="text-xs md:text-sm lg:text-[15px] font-semibold font-quicksand">
              Total
            </div>

            <div className="text-xs md:text-sm lg:text-[15px] font-semibold font-quicksand">
              Action
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-bg mt-2 md:mt-3 lg:mt-4">

            <div className="p-2 md:p-5 flex flex-col gap-3 md:gap-7">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] items-center"
                >

                  {/* Product */}
                  <div className="flex items-center gap-3">

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-6 h-6 md:w-10 md:h-10 object-contain"
                    />

                    <span className="text-xs md:text-sm text-secondary2">
                      {item.title}
                    </span>

                  </div>

                  {/* Price */}
                  <div className="text-xs md:text-sm text-secondary2">
                    $ {item.price}
                  </div>

                  {/* Quantity */}
                  <div>

                    <div className="flex items-center gap-2 md:gap-4 lg:gap-6 bg-white px-1 py-1 md:px-5 md:py-2 rounded w-fit text-xs">

                      <button
                        onClick={() => handleDecrement(item)}
                        className="cursor-pointer"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() => handleIncrement(item)}
                        className="cursor-pointer"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* Total */}
                  <div className="text-xs md:text-sm text-secondary2">
                    $ {(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>

                  {/* Delete */}
                  <div>

                    <RiDeleteBin6Line
                      onClick={() => handleDelete(item)}
                      className="text-secondary2 cursor-pointer"
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-2 md:mt-5 lg:mt-10 flex items-center justify-between">

          <Link
            to="/"
            className="text-xs md:text-sm text-[#444444] font-normal hover:underline transition-all"
          >
            Continue Shopping
          </Link>

          <Button className="bg-primary text-white rounded text-xs md:text-sm md:tracking-[0.48px]">
            Checkout
          </Button>

        </div>

        {/* Total */}
        <div className="flex justify-end mt-5">
          <h3 className="text-lg font-semibold">
            Cart Total: $ {total.toFixed(2)}
          </h3>
        </div>

        {/* Popular Products */}
        <div className="mt-5 md:mt-8 lg:mt-14">

          <h4 className="text-center text-cardtittle text-xl md:text-[26px] lg:text-[30px] font-bold tracking-[0.48px]">
            Popular Products
          </h4>

          <p className="text-xs md:text-sm text-secondary2 text-center md:w-147.5 leading-5.5 mx-auto tracking-[0.48px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et viverra maecenas accumsan
            lacus vel facilisis.
          </p>

        </div>

        {/* Products */}
        <div className="mt-5 md:mt-10 lg:mt-16 flex justify-between flex-wrap">

          {data.slice(10, 15).map((items) => (

            <ProductCard
              key={items.id}
              className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-14px)] lg:w-[calc(20%-20px)]"
              thumbnail={items.thumbnail}
              title={items.title}
              des={items.description}
              rating={items.rating}
              category={items.category}
              price={items.price}
              discountPercentage={items.discountPercentage}
            />

          ))}

        </div>

      </div>
    </section>
  );
}


export default Card;