
import React, { useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { CardSlice } from "../Slices/addtocartSlice";
import toast, { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";


function DealsOfTheDay() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(4);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((result) => {
        setData(result.products || []);
      })
      .catch(() => {
        toast.error("Products load failed!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (items) => {
    dispatch(
      CardSlice({
        id: items.id,
        title: items.title,
        description: items.description,
        thumbnail: items.thumbnail,
        images: items.images,
        price: items.price,
        discountPercentage: items.discountPercentage,
        rating: items.rating,
        category: items.category,
        brand: items.brand,
        stock: items.stock,
        availabilityStatus: items.availabilityStatus,
        warrantyInformation: items.warrantyInformation,
        shippingInformation: items.shippingInformation,
        returnPolicy: items.returnPolicy,
      }),
    );

    toast.success(`${items.title} added to cart!`, {
      duration: 1000,
      position: "top-right",
    });
  };

  return (
    <section className="max-w-360 w-full mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12 mb-70">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F172A",
            color: "#FFFFFF",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "10px 18px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22C55E",
              secondary: "#FFFFFF",
            },
          },
        }}
      />

      <div className="flex justify-between items-center">
        <SideHeading tittle="Deals Of The Day" />

        {show < data.length && (
          <Button
                onClick={() => {
                  setLoader(true);

                  setTimeout(() => {
                    setShow(data.length);
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
                  " All Deals"
                )}
              </Button>
        )}
      </div>

      <div className="mt-5 md:mt-8 lg:mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-secondary2 py-10">
            No products available right now.
          </p>
        ) : (
          <div className="flex flex-wrap justify-between gap-x-1 gap-y-50">
            {data.slice(0, show).map((items) => (
              <div
                key={items.id}
                className="bg-bg rounded-xl md:w-85 w-39 h-auto flex justify-center items-center relative md:hover:-translate-y-3 duration-300"
              >
                <img src={items.thumbnail} alt={items.title} className="w-30 h-30 md:w-50 md:h-50 object-cover" />

                <div className="absolute w-[90%] mt-80 md:mt-90 bg-white px-2 md:px-4 lg:px-5 py-2 md:py-3 lg:py-5 rounded-xl shadow">
                  <p className="text-xs font-lato font-normal text-secondary2 mt-2 md:mt-4 line-clamp-1">
                    {items.title}
                  </p>

                  <h3 className="text-[15px] font-medium md:leading-5 text-cardtittle tracking-[0.48px] overflow-hidden py-2 line-clamp-2 max-h-12">
                    {items.description}
                  </h3>

                  <div className="flex items-center gap-x-1 md:gap-x-5 py-1 md:py-2">
                    <div className="flex items-center gap-x-1 md:gap-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-sm md:text-[16px] ${
                            star <= Math.round(items.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[#B6B6B6] text-sm font-lato">
                      ({items.rating})
                    </span>
                  </div>

                  <p className="text-sm text-[#B6B6B6] font-lato mt-1 md:mb-3 lg:mb-6">
                    By{" "}
                    <span className="text-primary">{items.category}</span>
                  </p>

                  <div className="flex justify-between flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center gap-x-3">
                      <p className="text-success font-bold text-[15px] md:text-[18px] font-quicksand">
                        ${items.price}
                      </p>

                      <p className="text-secondary2 text-xs font-semibold line-through">
                        $
                        {(
                          items.price /
                          (1 - items.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                    </div>

                    <Button
                      onPress={() => handleAddToCart(items)}
                      className="bg-primary text-white rounded text-xs md:text-sm font-bold font-lato w-full md:w-fit mt-2 md:mt-0"
                    >
                      <AiOutlineShoppingCart className="text-xl" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DealsOfTheDay;
