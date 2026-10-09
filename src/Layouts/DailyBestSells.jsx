import React, { useRef, useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../Components/ProductCard";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

function DailyBestSells() {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);

  return (
    <section className="bg-gray-300">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-18 pt-3 md:pt-6 lg:pt-10 pb-4 md:pb-6 lg:pb-16">
        <SideHeading tittle="Daily Best Sells" />

        <div className="pt-5 md:pt-7 lg:pt-10">
          <div className="grid grid-cols-12 gap-5 md:gap-3 lg:gap-4">
            <div className="col-span-12 md:col-span-3">
             <div className="flex justify-center items-center">
               <img
                src="/bestseller.png"
                alt=""
                className="w-fit h-80 md:h-112 object-cover rounded-xl"
              />
             </div>
            </div>
            <div className="col-span-12 md:col-span-9 relative">
              <div className=" prev-btn browser-prev product-prev size-8 flex items-center justify-center  bg-success  rounded-full hover:bg-primary duration-300 transition cursor-pointer absolute top-1/2 -translate-1/2 z-50 left-[4%] md:left-0">
                <FaArrowLeft className="text-white" />
              </div>

              <Swiper
                navigation={{
                  prevEl: ".prev-btn ",
                  nextEl: ".next-btn ",
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
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className=" next-btn browser-next product-next size-8 flex items-center justify-center  bg-success rounded-full hover:bg-primary transition duration-300 cursor-pointer absolute right-[-5%] md:right-[-3%] top-1/2 -translate-1/2 z-50">
                <FaArrowRight className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyBestSells;
