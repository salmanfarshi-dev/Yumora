
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@heroui/react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import ProductCard from "../Components/ProductCard";
import ProductSkeleton from "../Components/ProductSkeleton";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeWishlist } from "../Slices/wishlistSlice";

function Wishtlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const [data, setData] = useState([]);
  const [show, setShow] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("https://dummyjson.com/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await res.json();
      setData(result.products || []);
    } catch (err) {
      setError(true);
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
          <>
            
{loading ? (
  <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
) : (
  <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
    {wishlistItems.slice(0, show).map((item) => (
      <div
        key={item.id}
        className="animate-[fadeIn_0.4s_ease-out_both]"
      >
        <ProductCard
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
      </div>
    ))}
  </div>
)}


            {show < wishlistItems.length && (
              <div className="text-center mt-6">
                <Button
                  onPress={() => setShow((prev) => prev + 12)}
                  className="px-6 py-3 bg-primary text-white rounded-lg"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}

        <div className="mt-5 md:mt-14 lg:mt-20">
          <h4 className="text-center text-cardtittle text-xl md:text-[26px] lg:text-[30px] font-bold tracking-[0.48px]">
            Popular Products
          </h4>

          <p className="text-xs md:text-sm text-secondary2 text-center md:w-147.5 leading-5.5 mx-auto tracking-[0.48px]">
            Discover popular products picked for you. Explore our collection
            and find something you love.
          </p>
        </div>

        <div className="mt-5 md:mt-10 lg:mt-16 mb-4 md:mb-10 lg:mb-16">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-secondary2 mb-4">
                Popular products could not be loaded.
              </p>

              <Button
                onPress={fetchProducts}
                className="bg-primary text-white rounded-lg px-6"
              >
                Try Again
              </Button>
            </div>
          ) : data.length === 0 ? (
            <p className="text-center text-secondary2 py-10">
              No popular products available right now.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
              {data.slice(20, 25).map((items) => (
                <div
                  key={items.id}
                  className="animate-[fadeIn_0.4s_ease-out_both]"
                >
                  <ProductCard
                    id={items.id}
                    className="w-full"
                    thumbnail={items.thumbnail}
                    title={items.title}
                    des={items.description}
                    rating={items.rating}
                    category={items.category}
                    price={items.price}
                    discountPercentage={items.discountPercentage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Wishtlist;
