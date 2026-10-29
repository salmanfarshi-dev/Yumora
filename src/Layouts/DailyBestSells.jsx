
import React, { useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import ProductSkeleton from "../Components/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../Components/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router";

function DailyBestSells() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        "https://dummyjson.com/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      setData(result.products || []);
    } catch (err) {
      console.error("Daily Best Sells error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-300">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-18 pt-3 md:pt-6 lg:pt-10 pb-4 md:pb-6 lg:pb-16">
        <SideHeading tittle="Daily Best Sells" />

        <div className="pt-5 md:pt-7 lg:pt-10">
          <div className="grid grid-cols-12 gap-5 md:gap-3 lg:gap-4">

            {/* Left Banner */}
            <div className="col-span-12 md:col-span-3">
              <div className="flex justify-center items-center">
                <Link to="/productlist">
                  <img
                    src="/bestseller.png"
                    alt="Daily best sellers"
                    className="w-fit h-80 md:h-112 object-cover rounded-xl"
                  />
                </Link>
              </div>
            </div>

            {/* Products Section */}
            <div className="col-span-12 md:col-span-9 relative">

              {/* Previous Arrow */}
              {!loading && !error && data.length > 0 && (
                <div className="prev-btn browser-prev product-prev size-8 flex items-center justify-center bg-success rounded-full hover:bg-primary duration-300 transition cursor-pointer absolute top-1/2 -translate-y-1/2 z-50 left-[4%] md:left-0">
                  <FaArrowLeft className="text-white" />
                </div>
              )}

              {/* Loading Skeleton */}
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                /* Error Section */
                <div className="py-12 text-center">
                  <p className="text-gray-700">
                    Unable to load products. Please check your internet connection.
                  </p>

                  <button
                    onClick={fetchProducts}
                    className="mt-4 rounded-lg bg-[#F74B81] px-6 py-2 text-white transition hover:bg-[#e63870]"
                  >
                    Try Again
                  </button>
                </div>
              ) : data.length === 0 ? (
                /* Empty State */
                <div className="py-12 text-center">
                  <p className="text-gray-700">
                    No products available right now.
                  </p>
                </div>
              ) : (
                /* Actual Swiper Slider */
                <Swiper
                  key={data.length}
                  navigation={{
                    prevEl: ".product-prev",
                    nextEl: ".product-next",
                  }}
                  modules={[Navigation]}
                  slidesPerView={2}
                  spaceBetween={10}
                  className="mySwiper"
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {data.map((items) => (
                    <SwiperSlide key={items.id}>
                      <div className="animate-[fadeIn_0.4s_ease-out_both]">
                        <ProductCard
                          id={items.id}
                          className="md:w-66!"
                          thumbnail={items.thumbnail}
                          title={items.title}
                          des={items.description}
                          rating={items.rating}
                          category={items.category}
                          price={items.price}
                          discountPercentage={items.discountPercentage}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Next Arrow */}
              {!loading && !error && data.length > 0 && (
                <div className="next-btn browser-next product-next size-8 flex items-center justify-center bg-success rounded-full hover:bg-primary transition duration-300 cursor-pointer absolute right-[-5%] md:right-[-3%] top-1/2 -translate-y-1/2 z-50">
                  <FaArrowRight className="text-white" />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyBestSells;
