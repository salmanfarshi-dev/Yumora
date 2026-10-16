import React, { useState } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { FaStar } from "react-icons/fa6";
import { Form, Input, Button } from "@heroui/react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useSelector } from "react-redux";
const paymentMethod = [
  {
    image: "/visacard.png",
  },
  {
    image: "/skrill-logo.png",
  },
  {
    image: "/PayPal-Logo.wine.png",
  },
  {
    image: "/MasterCard_early_1990s_logo.png",
  },
];
function Checkout() {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  const deliveryCharges = cartItems.length > 0 ? 10 : 0;
  const totalAmount = subtotal + deliveryCharges;
  const [eye, setEye] = useState(false);

  const handleeye = () => {
    setEye(!eye);
  };

  return (
    <section>
      <PageBreadcrumb title="Checkout" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0 ">
        <div className="my-7 md:my-16 lg:my-25 grid grid-cols-12 gap-5 md:gap-10 lg:gap-16 items-start">
          <div className="col-span-12 md:col-span-4 ">
            <div className="border border-border2 rounded p-2 md:p-4 lg:p-6 shadow">
              <h5 className="text-sm md:text-[16px] lg:text-xl font-semibold">
                Summery
              </h5>

              <div className="mt-3 md:mt-5 flex flex-col gap-2 md:gap-3 lg:gap-5 border-b border-border2 pb-2 md:pb-6">
                <div className="flex justify-between items-center">
                  <h6 className="text-xs md:text-sm text-secondary2 capitalize">
                    subtotal
                  </h6>
                  <span className="text-xs md:text-sm text-cardtittle">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-xs md:text-sm text-secondary2 capitalize">
                    delivery charges
                  </h6>
                  <span className="text-xs md:text-sm text-cardtittle">
                    ${deliveryCharges.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 md:mt-5">
                <h6 className=" text-sm md:text-[16px] text-cardtittle font-semibold capitalize">
                  total ammount
                </h6>
                <span className="text-xs md:text-sm text-cardtittle font-semibold">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 md:mt-7 lg:mt-9">
                <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="bg-bg flex justify-center items-center w-20 h-20 rounded shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-14 h-14 object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-1 md:gap-2 min-w-0">
                        <h3 className="text-sm md:text-[16px] tracking-[0.48px] capitalize text-cardtittle">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1 md:gap-2">
                          <FaStar className="text-yellow-400" />
                          <span className="text-xs text-secondary2">
                            {item.rating}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm md:text-[16px] font-bold text-success">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </h3>

                          <span className="text-xs text-secondary2">
                            Qty: {item.quantity || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-border2 rounded p-2 md:p-4 lg:p-6 shadow mt-3 md:mt-8">
              <h5 className="text-sm md:text-[16px] lg:text-xl font-semibold">
                Payment Method
              </h5>
              <p className="text-xs md:text-sm mt-2 md:mt-5 font-normal text-secondary2">
                Please select the preferred payment method to use on this order.
              </p>
              <div className="flex flex-col mt-3 md:mt-5 gap-1 md:gap-3">
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-primary"
                  />
                  <p className="text-xs md:text-sm font-medium capitalize text-secondary2">
                    Cash on delivery
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-primary"
                  />
                  <p className="text-xs md:text-sm font-medium capitalize text-secondary2">
                    UPI
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-primary"
                  />
                  <p className="text-xs md:text-sm font-medium capitalize text-secondary2">
                    Bank transfer
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border2 rounded p-2 md:p-4 lg:p-6 shadow mt-3 md:mt-8">
              <h5 className="text-sm md:text-[16px] lg:text-xl font-semibold">
                Payment Method
              </h5>

              <div className="flex gap-2 md:gap-4 items-center mt-2 md:mt-5">
                {paymentMethod.map((payment) => (
                  <div className="flex justify-center items-center w-15 md:w-20  h-8 md:h-10 md:py-3 shadow border border-border2 rounded cursor-pointer">
                    <img src={payment.image} alt="" className="w-8 md:w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 border border-border2 rounded p-2 md:p-4 lg:p-6 shadow">
            <h5 className="text-sm md:text-[16px] lg:text-xl font-semibold">
              Billing Details
            </h5>

            <div className="mt-2 md:mt-4 lg:mt-6">
              <p className="text-xs md:text-sm capitalize font-normal text-cardtittle">
                Checkout option
              </p>

              <div className="mt-2 md:mt-3 flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-7">
                <div className="flex items-center gap-2 md:gap-3">
                  <input type="radio" name="bill" className="accent-primary" />
                  <p className="text-xs md:text-sm font-medium text-secondary2">
                    I want to use an existing address
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <input type="radio" name="bill" className="accent-primary" />
                  <p className="text-xs md:text-sm font-medium text-secondary2">
                    I want to use new address
                  </p>
                </div>
              </div>

              <Form className=" md:w-[90%]  mt-3 md:mt-6 lg:mt-8 flex flex-col gap-4">
                <div className="flex flex-wrap justify-between gap-y-6">
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="First Name"
                    labelPlacement="outside"
                    name="firstname"
                    placeholder="Enter your First Name"
                    type="text"
                    className="md:w-[45%]"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Last Name"
                    labelPlacement="outside"
                    name="lastname"
                    placeholder="Enter your Last Name"
                    type="text"
                    className="md:w-[45%]"
                  />

                  <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    className="md:w-[45%]"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid phone number"
                    label="Phone Number"
                    labelPlacement="outside"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    type="tel"
                    className="md:w-[45%]"
                  />
                </div>
                <div className="w-full ">
                  <div className="relative">
                    <Input
                      isRequired
                      errorMessage="Please enter Password"
                      label="Password"
                      labelPlacement="outside"
                      name="password"
                      placeholder="Enter your password"
                      type={eye ? "text" : "password"}
                    />
                    <div
                      onClick={handleeye}
                      className="absolute top-1/2 -translate-1/2 right-5"
                    >
                      {eye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                    </div>
                  </div>
                </div>
                <Input
                  isRequired
                  errorMessage="Please enter this field"
                  label="Address"
                  labelPlacement="outside"
                  name="address"
                  placeholder="Enter your Address"
                  type="text"
                />
                <div className="flex flex-wrap justify-between gap-y-6">
                  <Input
                    isRequired
                    errorMessage="Please enter this field"
                    label="City"
                    labelPlacement="outside"
                    name="city"
                    placeholder="City"
                    type="text"
                    className="md:w-[45%]"
                  />
                  <Input
                    errorMessage="Please enter this field"
                    label="Post Code"
                    labelPlacement="outside"
                    name="PostCode"
                    placeholder="Post Code"
                    type="text"
                    className="md:w-[45%]"
                  />

                  <Input
                    isRequired
                    errorMessage="Please enter this field"
                    label="Country"
                    labelPlacement="outside"
                    name="country"
                    placeholder="Country"
                    type="text"
                    className="md:w-[45%]"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter this field"
                    label="Region State"
                    labelPlacement="outside"
                    name="region"
                    placeholder="Region/state"
                    type="tel"
                    className="md:w-[45%]"
                  />
                </div>

                <div className="flex justify-end items-center mt-2 md:mt-4 w-full">
                  <Button className="text-sm md:text-[16px] bg-primary rounded text-white">
                    Place Order
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
