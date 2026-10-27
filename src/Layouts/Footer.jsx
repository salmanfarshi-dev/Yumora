import React from "react";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsSendFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaBasketballBall } from "react-icons/fa";

const contactitem = [
  {
    icon: <CiLocationOn className="text-3xl text-primary" />,
    text: "51 Green St.Huntington ohaio beach ontario, NY 11746 KY 4783, USA.",
  },

  {
    icon: <MdOutlineMarkEmailRead className="text-[16px] text-primary" />,
    text: "example@email.com",
  },
  {
    icon: <MdOutlineLocalPhone className="text-[16px] text-primary" />,
    text: "+91 123 4567890",
  },
];

const company = [
  {
    head: "Company",
    items: [
      "About Us",
      "Delivery Information",
      "Privacy Policy",
      "Terms & Conditions",
      "contact Us",
      "Support Center",
    ],
  },
];

const category = [
  {
    head: "Category",
    items: [
      "Dairy & Bakery",
      "Fruits & Vegetable",
      "Snack & Spice",
      "Juice & Drinks",
      "Chicken & Meat",
      "Fast Food",
    ],
  },
];

const footerimage = [
  "/footerimage (1).png",
  "/footerimage (2).png",
  "/footerimage (3).png",
  "/footerimage (4).png",
  "/footerimage (5).png",
];

function Footer() {
  return (
    <footer className="bg-bg py-2 md:pt-10 lg:pt-20">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 mt-4 md:mt-7 lg:mt-12">
        <div className="grid grid-cols-12 max-w-fit  mx-auto gap-7 md:gap-10 lg:gap-15">
          <div className="col-span-12 md:col-span-3">
            <img src="/logo (2).png" alt="logo" className="w-20"/>
            <p className="text-sm text-footer-color leading-6 tracking-[0.48px] md:w-80">
              FoodTrove is the biggest market of grocery products. Get your
              daily needs from our store.
            </p>
            <div className="mt-3 md:mt-5 lg:mt-7 flex flex-col gap-3 md:gap-5">
              {contactitem.map((item) => (
                <li className="flex items-center gap-x-3 text-sm text-footer-color leading-6 tracking-[0.48px]">
                  {item.icon} {item.text}
                </li>
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            {company.map((item) => (
              <div key={item.head}>
                <h3 className="text-black font-bold text-[16px] md:text-[18px] tracking-[0.48px]">
                  {item.head}
                </h3>

                <ul className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-5">
                  {item.items.map((listItem) => (
                    <li
                      key={listItem}
                      className="text-xs md:text-sm text-footer-color"
                    >
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-6 md:col-span-3">
            {category.map((item) => (
              <div key={item.head}>
                <h3 className="text-black font-bold text-[16px] md:text-[18px] tracking-[0.48px]">
                  {item.head}
                </h3>

                <ul className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-5">
                  {item.items.map((listItem) => (
                    <li
                      key={listItem}
                      className="text-xs md:text-sm text-footer-color"
                    >
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="col-span-12 md:col-span-3">
            <h3 className="text-black font-bold text-[16px] md:text-[18px] tracking-[0.48px]">
              Subscribe Our Newslatter
            </h3>

            <div className="mt-3 md:mt-4 border border-gray-300 py-1 md:py-2 px-2 rounded relative">
              <input
                type="email"
                placeholder="Search here..."
                className="focus:outline-none placeholder:text-footer-color text-footer-color w-[90%] "
              />

              <BsSendFill className="absolute top-1/2 -translate-1/2 right-0 cursor-pointer" />
            </div>

            <div className="flex items-center gap-x-2 mt-3 md:mt-6">
              <div className="flex items-center justify-center w-8 h-8 border border-border2 rounded bg-white">
                <FaFacebookF />
              </div>
              <div className="flex items-center justify-center w-8 h-8 border border-border2 rounded bg-white">
                <FiTwitter />
              </div>
              <div className="flex items-center justify-center w-8 h-8 border border-border2 rounded bg-white">
                <FaBasketballBall />
              </div>
              <div className="flex items-center justify-center w-8 h-8 border border-border2 rounded bg-white">
                <FaInstagram />
              </div>
            </div>
            <div className="mt-2 md:mt-5 flex gap-2 items-center">
              {footerimage.map((items) => (
                <div className="w-10 h-10 rounded-[10px]overflow-hidden">
                  <img
                    src={items}
                    alt=""
                    className="cursor-pointer hover:scale-105 transition duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 md:py-3 mt-3 md:mt-8 lg:mt-14 text-center border-t border-border2">
        <p className="text-xs md:text-sm text-secondary">© 2025 <span className="text-primary ">foodzy</span>, All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
