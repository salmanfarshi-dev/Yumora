import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import ProductCard from "../Components/ProductCard";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeWishlist } from "../Slices/wishlistSlice";

function Wishtlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || [],
  );

  const [data, setData] = useState([]);
  const [show, setShow] = useState(12);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => setData(result.products))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <section>
      <PageBreadcrumb title="Wishlist" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Wishlist Is Empty
            </h2>
            <p className="text-gray-500 mt-2">
              Click the heart icon to add products to your wishlist.
            </p>
          </div>
        ) : (
          <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {wishlistItems.slice(0, show).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                deleteicon={
                  <RiDeleteBinLine className="text-white cursor-pointer" />
                }
                ondelete={() => dispatch(removeWishlist(item.id))}
                thumbnail={item.thumbnail}
                title={item.title}
                des={item.description}
                rating={item.rating}
                category={item.category}
                price={item.price}
                discountPercentage={item.discountPercentage}
              />
            ))}
          </div>
        )}

        {show < wishlistItems.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShow((prev) => prev + 12)}
              className="px-6 py-3 bg-primary text-white rounded-lg"
            >
              Load More
            </button>
          </div>
        )}

        <div className="mt-5 md:mt-14 lg:mt-20">
          <h4 className="text-center text-cardtittle text-xl md:text-[26px] lg:text-[30px] font-bold tracking-[0.48px]">
            Popular Products
          </h4>

          <p className="text-xs md:text-sm text-secondary2 text-center md:w-147.5 leading-5.5 mx-auto tracking-[0.48px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et viverra maecenas accumsan
            lacus vel facilisis.
          </p>
        </div>

        <div className="mt-5 md:mt-10 lg:mt-16 mb-4 md:mb-10 lg:mb-16 flex justify-between flex-wrap">
          {data.slice(20, 25).map((items) => (
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

export default Wishtlist;
