import { Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router";

function OrganicHealth() {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-7 w-full">
          <div
            className="
        flex-1 min-w-0
        h-[220px] sm:h-[240px] md:h-[280px]
        md:hover:flex-[2]
        transition-all duration-500
        bg-[url('/health1.png')]
        bg-center bg-cover bg-no-repeat
        rounded-xl
        flex flex-col justify-center items-end
      "
          >
            <div className="px-5 sm:px-7 md:px-10 flex flex-col items-end  py-3 md:py-0">
              <p
                className="text-[17px] sm:text-lg md:text-xl lg:text-[24px] font-semibold
          w-[180px] sm:w-[210px] md:w-[250px]
          text-end mb-3 md:mb-5 text-white"
              >
                Organic & Healthy Vegetables
              </p>

             <Link to="/productlist">
              <Button className="rounded bg-primary text-white text-xs md:text-sm w-fit">
                Shop Now
              </Button>
              </Link>
            </div>
          </div>

          <div
            className="
        flex-1 min-w-0
        h-[220px] sm:h-[240px] md:h-[280px]
        md:hover:flex-[2]
        transition-all duration-500
        bg-[url('/health2.png')]
        bg-center bg-cover bg-no-repeat
        rounded-xl
        flex flex-col justify-center items-end
      "
          >
            <div className="px-5 sm:px-7 md:px-10 flex flex-col items-end py-3 md:py-0">
              <p
                className="text-[17px] sm:text-lg md:text-xl lg:text-[24px] font-semibold
          w-[180px] sm:w-[210px] md:w-[250px]
          text-end mb-3 md:mb-5 text-white"
              >
                Organic & Healthy Pizza
              </p>

               <Link to="/productlist">
              <Button className="rounded bg-primary text-white text-xs md:text-sm w-fit">
                Shop Now
              </Button>
              </Link>
            </div>
          </div>

          <div
            className="
        flex-[2] min-w-0
        h-[220px] sm:h-[240px] md:h-[280px]
        bg-[url('/health3.png')]
        bg-center bg-cover bg-no-repeat
        rounded-xl
        flex flex-col justify-center items-end
      ">
            <div className="px-5 sm:px-7 md:px-10 flex flex-col items-end  py-3 md:py-0">
              <p
                className="text-[17px] sm:text-lg md:text-xl lg:text-[24px] font-semibold
          w-[180px] sm:w-[210px] md:w-[250px]
          text-end mb-3 md:mb-5 text-white"
              >
                Organic & Healthy Vegetables
              </p>

                <Link to="/productlist">
              <Button className="rounded bg-primary text-white text-xs md:text-sm w-fit">
                Shop Now
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganicHealth;
