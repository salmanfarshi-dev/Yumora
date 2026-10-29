
import React, { useEffect, useState } from "react";
import { Pagination, Button } from "@heroui/react";
import ProductCard from "../Components/ProductCard";
import ProductSkeleton from "../Components/ProductSkeleton";
import PageBreadcrumb from "../Components/PageBreadcrumb";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(8);
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
      setCurrentPage(1);
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

  const handleselect = (e) => {
    setSelect(Number(e.target.value));
    setCurrentPage(1);
  };

  const start = (currentPage - 1) * select;
  const currentItems = data.slice(start, start + select);
  const pageCount = Math.ceil(data.length / select);

  return (
    <section>
      <PageBreadcrumb title="ProductList" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        <div className="bg-bg p-2 md:p-3 rounded flex items-center justify-between">
          <p className="text-xs md:text-sm text-secondary2 font-normal tracking-[0.48px]">
            {loading ? (
              "Loading products..."
            ) : error ? (
              "Products unavailable"
            ) : (
              `We found ${data.length} items for you!`
            )}
          </p>

          <div className="border border-border1 bg-white rounded-[5px] p-2 md:p-3">
            <label
              htmlFor="show"
              className="text-xs md:text-sm capitalize font-medium"
            >
              Show:
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

        <div className="mt-4 md:mt-10 lg:mt-14">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-between md:gap-6 lg:gap-10">
              {Array.from({ length: select }).map((_, index) => (
                <div
                  key={index}
                  className="w-full md:w-[calc(33.333%-16px)] lg:w-[calc(25%-30px)] animate-[fadeIn_0.4s_ease-out_both]"
                >
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-semibold text-cardtittle">
                Oops! Products could not be loaded.
              </h3>

              <p className="text-secondary2 text-sm mt-2 mb-5">
                Please check your internet connection and try again.
              </p>

              <Button
                onPress={fetchProducts}
                className="bg-primary text-white rounded-lg px-6"
              >
                Try Again
              </Button>
            </div>
          ) : data.length === 0 ? (
            <p className="text-center text-secondary2 py-16">
              No products available right now.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-between md:gap-6 lg:gap-10">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-[calc(33.333%-16px)] lg:w-[calc(25%-30px)] animate-[fadeIn_0.4s_ease-out_both]"
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
        </div>

        {!loading && !error && data.length > 0 && (
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-6 md:mt-7 lg:mt-16 mb-4 md:mb-10 lg:mb-13">
            <Button
              isDisabled={currentPage <= 1}
              className="text-xs md:text-sm rounded-[5px] text-cardtittle bg-bg border border-border1"
              variant="flat"
              onPress={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
            >
              Previous
            </Button>

            <Pagination
              color="secondary"
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
              isDisabled={currentPage >= pageCount}
              className="text-xs md:text-sm rounded-[5px] text-cardtittle bg-bg border border-border1"
              variant="flat"
              onPress={() =>
                setCurrentPage((prev) => Math.min(pageCount, prev + 1))
              }
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
