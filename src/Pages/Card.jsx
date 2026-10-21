import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import {
  decrementcart,
  incrementcart,
  deletecart,
  clearCart,
} from "../Slices/addtocartSlice";
import { Button } from "@heroui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { toggleWishlist } from "../Slices/wishlistSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || [],
  );
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * (item.quantity || 1);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Cart Is Empty
          </h2>

          <p className="text-gray-500 mt-2">Add some products to your cart.</p>

          <Link
            to="/"
            className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <PageBreadcrumb title="card" />

      <div className="max-w-360 mx-auto py-5 md:py-10 px-4 md:px-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

            <p className="text-gray-500 mt-1">
              {cartItems.length} product(s) in your cart
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-5"
              >
                <div className="w-full sm:w-32 h-32 flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>

                      <p className="text-sm text-gray-500 capitalize">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 md:gap-7">
                      <div
                        className="bg-transparent text-xl text-secondary"
                        onClick={() => dispatch(deletecart(item))}
                      >
                        <RiDeleteBin6Fill />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const isWishlisted = wishlistItems.some(
                            (product) => product.id === item.id,
                          );

                          dispatch(toggleWishlist(item));

                          if (isWishlisted) {
                            toast.error("Removed from wishlist!");
                          } else {
                            toast.success("Added to wishlist!");
                          }
                        }}
                        className="bg-transparent text-xl text-secondary cursor-pointer"
                        aria-label={
                          wishlistItems.some(
                            (product) => product.id === item.id,
                          )
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {wishlistItems.some(
                          (product) => product.id === item.id,
                        ) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xl font-bold mt-3">${item.price}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => dispatch(decrementcart(item))}
                      className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="font-semibold min-w-5 text-center">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() => dispatch(incrementcart(item))}
                      className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-5">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="flex justify-between mt-6 text-gray-600">
                <span>Subtotal</span>

                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mt-3 text-gray-600">
                <span>Shipping</span>

                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default Card;
