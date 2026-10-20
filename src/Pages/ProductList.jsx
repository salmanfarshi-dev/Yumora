import React, { useEffect, useState } from "react";

import { Pagination, Button } from "@heroui/react";

import ProductCard from "../Components/ProductCard";
import PageBreadcrumb from "../Components/PageBreadcrumb";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState( 8);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);

  const handleselect = (e) => {
    setSelect(Number(e.target.value));
    setCurrentPage(1);
  };

  const start = (currentPage - 1) * select;

  const currentItems = data.slice(start, start + select);

  const pageCount = Math.ceil(data.length / select);

  return (
    <section className="">
      <PageBreadcrumb title="ProductList" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        <div className="bg-bg p-2 md:p-3 rounded flex items-center justify-between">
          <p className="text-xs md:text-sm text-secondary2 font-normal tracking-[0.48px]">
            We found {data.length} items for you!
          </p>

          <div className="border border-border1 bg-white rounded-[5px] p-2 md:p-3">
            <label
              htmlFor="show"
              className="text-xs md:text-sm capitalize font-medium"
            >
              show :
            </label>

            <select
              id="show"
              value={select}
              onChange={handleselect}
              className="focus:outline-none"
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        <div className="mt-4 md:mt-10 lg:mt-14 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-between md:gap-10">
          {currentItems.map((item) => (
            <ProductCard
              key={item.id}
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

        <div className="flex justify-center gap-2 md:gap-4 mt-3 md:mt-7 lg:mt-16 mb-4 md:mb-10 lg:mb-13">
          <Button
            className="text-xs md:text-sm rounded-[5px] text-cardtittle bg-bg border border-border1"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>

          <Pagination
            color="secondary"
            className=""
            page={currentPage}
            total={pageCount}
            onChange={setCurrentPage}
            classNames={{
              wrapper: "gap-1",
              item: "bg-white text-cardtittle border border-border1",
              cursor: "bg-primary text-white",
            }}
          />

          <Button
            className="text-xs md:text-sm rounded-[5px] text-cardtittle bg-bg border border-border1"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
