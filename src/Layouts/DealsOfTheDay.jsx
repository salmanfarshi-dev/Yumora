import React, { useEffect, useState } from "react";
import SideHeading from "../Components/SideHeading";
import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { CardSlice } from "../Slices/addtocartSlice";

function DealsOfTheDay() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(4);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);

  return (
    <section className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12 mb-70">
      <div className="flex justify-between items-center">
        <SideHeading tittle="Deals Of The Day" />
        {show < data.length && (
          <Button
            onClick={() => setShow(data.length)}
            className="bg-primary text-white rounded text-xs md:text-sm font-semibold"
          >
            All Details
          </Button>
        )}
      </div>

      <div className="mt-5 md:mt-8 lg:mt-12">
        <div className="flex flex-wrap justify-between gap-x-2 gap-y-50">
          {data.slice(0, show).map((items) => (
            <div className="bg-bg rounded-xl md:w-85 w-41 h-auto flex justify-center items-center relative md:hover:-translate-y-3 duration-300">
              <img src={items.thumbnail} alt="" />

              <div className="absolute w-[90%] mt-80 md:mt-90 bg-white px-2 md:px-4 lg:px-5 py-2 md:py-3 lg:py-5 rounded-xl shadow ">
                <p className="text-xs font-lato font-normal text-secondary2 mt-2 md:mt-4 line-clamp-1">
                  {items.title}
                </p>

                <h3 className="text-[15px] font-medium md:leading-5 text-cardtittle tracking-[0.48px] overflow-hidden py-2 line-clamp-2 max-h-12">
                  {items.description}
                </h3>

                <div className="flex items-center gap-x-2 md:gap-x-5 py-1 md:py-2">
                  <div className="flex items-center gap-x-1 md:gap-x-2">
                    <FaStar className="text-yellow-400 text-sm md:text-[16px]" />
                    <FaStar className="text-yellow-400 text-sm md:text-[16px]" />
                    <FaStar className="text-yellow-400 text-sm md:text-[16px]" />
                    <FaStar className="text-yellow-400 text-sm md:text-[16px]" />
                    <FaStar className="text-yellow-400 text-sm md:text-[16px]" />
                  </div>
                  <span className="text-[#B6B6B6] text-sm font-lato">
                    ({items.rating})
                  </span>
                  <div></div>
                </div>
                <p className="text-sm text-[#B6B6B6] font-lato mt-2 md:mb-3 lg:mb-6">
                  By <span className="text-primary">{items.category}</span>
                </p>

                <div className="flex justify-between flex-col md:flex-row items-start  md:items-center ">
                  <div className="flex items-center gap-x-3">
                    <p className="text-success font-bold text-[15px] md:text-[18px] font-quicksand">
                      ${items.price}
                    </p>
                    <p className="text-secondary2 text-xs font-semibold line-through">
                      ${items.discountPercentage}
                    </p>
                  </div>

                  <Button
                    onPress={() =>
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
                      )
                    }
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
      </div>
    </section>
  );
}

export default DealsOfTheDay;
