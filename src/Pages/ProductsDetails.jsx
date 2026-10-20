import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import ProductCard from "../Components/ProductCard";

function ProductsDetails() {
  let [data, setData] = useState([]);
  const [Active, setActive] = useState("Description");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);
  return (
    <>
      <PageBreadcrumb title="Productdetails" />

      <section className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 py-4 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3">
          <div className="md:w-[50%]">
            <div className="md:w-117.5 md:h-117.5 bg-bg rounded flex justify-center items-center border border-border1">
              <img src="/→ product-1-1.jpg.png" alt="" className="md:w-70" />
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-4 mt-2 md:mt-4 ">
              <div className="w-20 h-20 bg-bg rounded  flex justify-center items-center border border-border1">
                <img
                  src="/public/→ product-1-1.jpg.png"
                  alt=""
                  className="w-10 h-10 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:w-[50%]">
            <h4 className="text-[18px] md:text-[22px] font-quicksand font-semibold text-cardtittle">
              Product Name
            </h4>

            <p className="pt-2 md:pt-4 pb-3 md:pb-5 tracking-[0.48px] md:leading-6.2 md:w-116.5 text-secondary border-b border-border2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure
              minus error doloribus saepe natus?
            </p>

            <div className="flex items-center gap-2 md:gap-5 my-3 md:my-5">
              <div className="flex items-center gap-x-1 md:gap-x-2">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <p className="text-xs md:text-sm text-secondary2">
                ( 40 review )
              </p>
            </div>
            <div className="mt-3 md:mt-6 flex flex-col gap-2 md:gap-4">
              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  Brand
                </p>
                <span>:</span>
                <span className="text-secondary2">EST co</span>
              </div>

              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  SKU
                </p>
                <span>:</span>
                <span className="text-secondary2">EST co</span>
              </div>

              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  Warranty Information
                </p>
                <span>:</span>
                <span className="text-secondary2">EST co</span>
              </div>

              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  Shipping Information
                </p>
                <span>:</span>
                <span className="text-secondary2">EST co</span>
              </div>

              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  Availability Status
                </p>
                <span>:</span>
                <span className="text-secondary2">EST co</span>
              </div>
              <div className="grid grid-cols-[150px_20px_1fr] md:grid-cols-[200px_20px_1fr] items-center">
                <p className="text-sm md:text-[16px] font-semibold text-cardtittle capitalize">
                  weight
                </p>
                <span>:</span>
                <span className="text-secondary2">4 Grams</span>
              </div>
            </div>

            <div className="mt-3 md:mt-7 lg:mt-12">
              <p className="text-xl md:text-[28px] font-semibold text-primary tracking-[.48px]">
                $ 120.44{" "}
                <span className="text-secondary2 text-sm md:text-[16px] font-normal line-through">
                  $ 28.25
                </span>
              </p>
            </div>

            <div className="mt-3 md:mt-6 flex items-center gap-2 md:gap-3 lg:gap-4">
              <div className="flex gap-x-1 md:gap-x-2 items-center">
                <div className="flex justify-center items-center w-10 h-10  md:w-14 md:h-14 border border-border2 shadow rounded text-sm md:text-xl font-semibold">
                  1
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 border border-border2 shadow rounded flex justify-center items-center font-semibold cursor-pointer">
                    +
                  </div>
                  <div className="w-5 h-5 md:w-6 md:h-6 border border-border2 shadow rounded flex justify-center items-center font-semibold cursor-pointer">
                    -
                  </div>
                </div>
              </div>

              <Button className="bg-primary rounded text-white font-sm md:text-xl tracking-[0.48px] md:py-6.5 md:px-8">
                Add to cart
              </Button>

              <div className="flex justify-center items-center w-10 h-10  md:w-14 md:h-14 border border-border2 shadow rounded text-sm md:text-xl font-semibold cursor-pointer">
                <FaRegHeart />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-13 lg:mt-16">
          <div className="border border-border2 px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 rounded shadow">
            <div className="flex items-center gap-3 md:gap-7 lg:gap-10">
              <Button
                onClick={() => setActive("Description")}
                className={`text-sm md:text-[17px] font-semibold bg-transparent pb-2 md:pb-3 ${Active === "Description" ? "text-primary border-b-2 border-primary" : "text-cardtittle"}`}
              >
                Description
              </Button>
              <Button
                onClick={() => setActive("Information")}
                className={`text-sm md:text-[17px] font-semibold bg-transparent pb-2 md:pb-3 ${Active === "Information" ? "text-primary border-b-2 border-primary" : "text-cardtittle"}`}
              >
                Information
              </Button>
              <Button
                onClick={() => setActive("Review")}
                className={`text-sm md:text-[17px] font-semibold bg-transparent pb-2 md:pb-3 ${Active === "Review" ? "text-primary border-b-2 border-primary" : "text-cardtittle"}`}
              >
                Review
              </Button>
            </div>

            <div className="mt-4 md:mt-8 lg:mt-10">
              <div className="">
                {Active === "Description" && (
                  <p className="text-xs md:text-sm text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error in vero sapiente odio, error dolore vero temporibus
                    consequatur, nobis veniam odit dignissimos consectetur quae
                    in perferendis doloribusdebitis corporis, eaque dicta,
                    repellat amet, illum adipisci vel perferendis dolor! Quis
                    vel consequuntur repellat distinctio rem. Corrupti ratione
                    alias odio, error dolore temporibus consequatur, nobis
                    veniam odit laborum dignissimos consectetur quae vero in
                    perferendis provident quis. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Odit ratione velit dolorem,
                    inventore exercitationem ut incidunt eos excepturi
                    repellendus voluptas nesciunt eaque similique soluta nulla
                    sint error voluptatem consectetur. Commodi.
                  </p>
                )}
              </div>
              <div className="">
                {Active === "Information" && (
                  <p className="text-xs md:text-sm text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error in vero sapiente odio, error dolore vero temporibus
                    consequatur, nobis veniam odit dignissimos consectetur quae
                    in perferendis doloribusdebitis corporis, eaque dicta,
                    repellat amet, illum adipisci vel perferendis dolor! Quis
                    vel consequuntur repellat distinctio rem. Corrupti ratione
                    alias odio, error dolore temporibus consequatur, nobis
                    veniam odit laborum dignissimos consectetur quae vero in
                    perferendis provident quis.
                  </p>
                )}
              </div>
              <div className="">
                {Active === "Review" && (
                  <p className="text-xs md:text-sm text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error in vero sapiente odio, error dolore vero temporibus
                    consequatur, nobis veniam odit dignissimos consectetur quae
                    in perferendis doloribusdebitis corporis, eaque dicta,
                    repellat amet, illum adipisci vel perferendis dolor! Quis
                    vel consequuntur repellat distinctio rem. Corrupti ratione
                    alias odio, error dolore temporibus consequatur, nobis
                    veniam odit laborum dignissimos consectetur quae vero in
                    perferendis provident quis. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Odit ratione velit dolorem,
                    inventore exercitationem ut incidunt eos excepturi
                    repellendus voluptas nesciunt eaque similique soluta nulla
                    sint error voluptatem consectetur. Commodi. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Commodi
                    voluptatem, facere repudiandae consequatur velit hic
                    veritatis culpa vel delectus quibusdam quo amet tempora
                    nulla molestiae blanditiis vero dolorem ipsam enim iste est
                    esse mollitia dolores. Corrupti, ducimus. Non, id saepe!
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 md:mt-6 lg:mt-8 ">
              <h5 className="text-cardtittle text-sm md:text-[17px] font-semibold font-medium border-b border-border1 pb-2 md:pb-3">
                Packaging & Delivery
              </h5>

              <p className="mt-2 md:mt-4 text-xs md:text-sm text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                in vero perferendis dolor! Quis vel consequuntur repellat
                distinctio rem. Corrupti ratione alias odio, error dolore
                temporibus consequatur, nobis veniam odit laborum dignissimos
                consectetur quae vero in perferendis provident quis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-8 lg:mt-14">
          <h4 className="text-center text-cardtittle text-xl md:text-[26px] lg:text-[30px] font-bold tracnking-[0.48px]">
            Popular Products
          </h4>
          <p className="text-xs md:text-sm text-secondary2 text-center md:w-147.5 leading-5.5 mx-auto tracnking-[0.48px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et viverra maecenas accumsan
            lacus vel facilisis.
          </p>
        </div>

        <div className="mt-5 md:mt-10 lg:mt-16 flex justify-between flex-wrap">
          {data.slice(5, 10).map((items) => (
            <ProductCard
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
      </section>
    </>
  );
}

export default ProductsDetails;
