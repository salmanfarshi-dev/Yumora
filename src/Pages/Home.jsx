import React, { useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import ProductCard from "../Components/ProductCard";
import ProductSkeleton from "../Components/ProductSkeleton";
import { Button } from "@heroui/react";
import { RotatingLines } from "react-loader-spinner";
import DailyBestSells from "../Layouts/DailyBestSells";
import DealsOfTheDay from "../Layouts/DealsOfTheDay";
import WhyChoose from "../Layouts/WhyChoose";
import OrganicHealth from "../Layouts/OrganicHealth";
import OfferSection from "../Layouts/OfferSection";
import { Link, useNavigate } from "react-router";

const shopping = ["/shoping (1).png", "/shoping (2).png", "/shoping (3).png"];

function Home() {
  const navigate = useNavigate();
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(12);
  const [loader, setLoader] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();

      setData(result.products || []);
    } catch (err) {
      console.error("Product fetching error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Link to="/productlist">
        <Link to="/productlist">
          <div className="relative w-full min-h-24 md:h-[80vh] overflow-hidden bg-gray-100">
            {!bannerLoaded && !bannerError && (
              <div className="absolute inset-0 animate-pulse bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]" />
              </div>
            )}

            {bannerError ? (
              <div className="flex min-h-24 md:h-full items-center justify-center text-sm text-gray-500">
                Banner image could not be loaded.
              </div>
            ) : (
              <img
                src="/banner.png"
                alt="Yumora shopping banner"
                fetchPriority="high"
                onLoad={() => setBannerLoaded(true)}
                onError={() => setBannerError(true)}
                className={`w-full h-auto md:h-full object-cover transition-opacity duration-700 ${
                  bannerLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </Link>
      </Link>

      <section className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        <div className="flex items-center gap-3">
          {shopping.map((items, index) => (
            <img
              key={index}
              src={items}
              alt="Shopping category"
              onClick={() => navigate("/productlist")}
              className="w-[31%] md:w-[33%] lg:h-70 object-cover cursor-pointer"
            />
          ))}
        </div>

        <div className="mt-5 md:mt-10 lg:mt-14">
          <SideHeading tittle="Popular Products" />

          {loading ? (
            <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-gray-600 text-base">
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
            <div className="py-12 text-center">
              <p className="text-gray-600">No products available right now.</p>

              <button
                onClick={fetchProducts}
                className="mt-4 rounded-lg bg-[#F74B81] px-6 py-2 text-white"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {data.slice(0, show).map((item) => (
                <div
                  key={item.id}
                  className="animate-[fadeIn_0.4s_ease-out_both]"
                >
                  <ProductCard
                    id={item.id}
                    off="-25%"
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

          {!loading && !error && show < data.length && (
            <div className="flex justify-center mt-5 md:mt-9 lg:mt-16">
              <Button
                onPress={() => {
                  setLoader(true);

                  setTimeout(() => {
                    setShow((previous) => previous + 4);
                    setLoader(false);
                  }, 500);
                }}
                isDisabled={loader}
                className="bg-primary text-white text-xl font-medium rounded"
              >
                {loader ? (
                  <RotatingLines
                    visible={true}
                    height="25"
                    width="25"
                    color="#22d3ee"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                ) : (
                  "Show more"
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      <DailyBestSells />
      <DealsOfTheDay />
      <WhyChoose />
      <OrganicHealth />
      <OfferSection />
    </>
  );
}

export default Home;
