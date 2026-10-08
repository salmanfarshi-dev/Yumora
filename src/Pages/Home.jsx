import React, { useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import ProductCard from "../Components/ProductCard";
import { Button } from "@heroui/react";
import { RotatingLines } from "react-loader-spinner";
import DailyBestSells from "../Layouts/DailyBestSells";
import DealsOfTheDay from "../Layouts/DealsOfTheDay";
import WhyChoose from "../Layouts/WhyChoose";
import OrganicHealth from "../Layouts/OrganicHealth";
import OfferSection from "../Layouts/OfferSection";

const shopping = ["/shoping (1).png", "/shoping (2).png", "/shoping (3).png"];
function Home() {
  let [data, setData] = useState([]);
  const [show, setShow] = useState(12);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);

  return (
    <>
      {/* ============= 
     banner section start
     ================= */}

      <div className="w-full md:h-[80vh]">
        <img src="/banner.png" alt="" className="w-full h-full object-cover" />
      </div>
      {/* ============= 
     banner section end
     ================= */}

      {/* ============= 
     shoping section start
     ================= */}

      <section className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        <div className="flex items-center gap-3">
          {shopping.map((items) => (
            <img
              src={items}
              alt=""
              className="w-[31%] md:w-[33%] lg:h-70 object-cover"
            />
          ))}
        </div>

        {/* ============= 
     shoping section end
     ================= */}
        {/* ============= 
     Popular Products section start
     ================= */}

        <div className=" mt-5 md:mt-10 lg:mt-14">
          <SideHeading tittle="Popular Products" />

          <div className="mt-3 md:mt-8 lg:mt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {data.slice(0, show).map((item) => (
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
            ))}
          </div>
          <div className="flex justify-center mt-5 md:mt-9 lg:mt-16">
            {show < data.length && (
              <Button
                onClick={() => {
                  setLoader(true);

                  setTimeout(() => {
                    setShow(show + 4);
                    setLoader(false);
                  }, 500);
                }}
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
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Show more"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* ============= 
     Popular Products section end
     ================= */}
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
