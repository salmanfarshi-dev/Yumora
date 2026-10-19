import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { FaStar } from "react-icons/fa6";
import { Form, Input, Button } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import { clearCart } from "../Slices/addtocartSlice";

const paymentMethod = [
  { image: "/visacard.png" },
  { image: "/skrill-logo.png" },
  { image: "/PayPal-Logo.wine.png" },
  { image: "/MasterCard_early_1990s_logo.png" },
];

function Checkout() {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState("Cash on delivery");

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * (item.quantity || 1),
    0,
  );

  const deliveryCharges = cartItems.length > 0 ? 10 : 0;
  const totalAmount = subtotal + deliveryCharges;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (submitting) return;

    if (!authChecked) {
      toast.error("Please wait while we verify your account.");
      return;
    }

    if (!user) {
      navigate("/account", {
        state: { from: "/checkout" },
      });
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstname") || "").trim();

    const lastName = String(formData.get("lastname") || "").trim();

    const email = String(formData.get("email") || "").trim();

    const phone = String(formData.get("phone") || "").trim();

    const address = String(formData.get("address") || "").trim();

    const city = String(formData.get("city") || "").trim();

    const postCode = String(formData.get("PostCode") || "").trim();

    const country = String(formData.get("country") || "").trim();

    const region = String(formData.get("region") || "").trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country ||
      !region
    ) {
      toast.error("Please fill in all required billing details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      title: item.title || "",
      thumbnail: item.thumbnail || "",
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
      subtotal: Number(item.price || 0) * Number(item.quantity || 1),
    }));

    const order = {
      userId: user.uid,
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postCode,
        country,
        region,
      },
      items: orderItems,
      subtotal,
      deliveryCharges,
      totalAmount,
      currency: "USD",
      paymentMethod: payment,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      createdAt: serverTimestamp(),
    };

    try {
      setSubmitting(true);

      await addDoc(collection(db, "orders"), order);

      dispatch(clearCart());
      toast.success("Order placed successfully!");

      navigate("/");
    } catch (error) {
      console.error("Place order error:", error);

      if (error.code === "permission-denied") {
        toast.error("Permission denied. Please check your Firestore rules.");
      } else {
        toast.error("Unable to place your order. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!authChecked) {
    return (
      <section>
        <PageBreadcrumb title="Checkout" />
        <div className="min-h-60 flex items-center justify-center">
          <p className="text-secondary2">Checking your account...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <PageBreadcrumb title="Checkout" />

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-0">
        <div className="my-7 md:my-16 lg:my-25 grid grid-cols-12 gap-5 md:gap-10 lg:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="border border-border2 rounded p-3 md:p-4 lg:p-6 shadow">
              <h5 className="text-sm md:text-xl font-semibold">
                Order Summary
              </h5>

              <div className="mt-4 flex flex-col gap-3 border-b border-border2 pb-4">
                <div className="flex justify-between gap-2">
                  <span className="text-sm text-secondary2">Subtotal</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-sm text-secondary2">
                    Delivery charges
                  </span>
                  <span className="text-sm">${deliveryCharges.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between gap-2 mt-4">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="bg-bg flex items-center justify-center w-16 h-16 rounded shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-1 mt-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-xs text-secondary2">
                          {item.rating ?? "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-2 mt-1">
                        <span className="text-sm font-bold text-success">
                          $
                          {(
                            Number(item.price || 0) * (item.quantity || 1)
                          ).toFixed(2)}
                        </span>

                        <span className="text-xs text-secondary2">
                          Qty: {item.quantity || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border2 rounded p-3 md:p-4 lg:p-6 shadow mt-4">
              <h5 className="text-sm md:text-xl font-semibold">
                Payment Method
              </h5>

              <p className="text-xs md:text-sm mt-3 text-secondary2">
                Select your preferred payment method.
              </p>

              <div className="flex flex-col mt-4 gap-3">
                {["Cash on delivery", "UPI", "Bank transfer"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment-choice"
                      value={method}
                      checked={payment === method}
                      onChange={() => setPayment(method)}
                      className="accent-primary"
                    />
                    <span className="text-sm text-secondary2">{method}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {paymentMethod.map((item, index) => (
                  <div
                    key={item.image}
                    className="flex justify-center items-center w-14 md:w-16 h-9 shadow border border-border2 rounded"
                  >
                    <img
                      src={item.image}
                      alt={`Payment option ${index + 1}`}
                      className="w-10 md:w-12 max-h-7 object-contain"
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-secondary2 mt-3">
                Online payment processing is not connected yet.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 border border-border2 rounded p-3 md:p-4 lg:p-6 shadow">
            <h5 className="text-sm md:text-xl font-semibold">
              Billing Details
            </h5>

            {!user && (
              <div className="mt-4 rounded-lg border border-border2 p-3">
                <p className="text-sm text-secondary2">
                  You need to register before placing your order.
                </p>

                <Button
                  type="button"
                  className="mt-3 bg-primary text-white rounded"
                  onPress={() =>
                    navigate("/account", {
                      state: { from: "/checkout" },
                    })
                  }
                >
                  Register Account
                </Button>
              </div>
            )}

            <Form
              className="mt-5 md:w-[90%] flex flex-col gap-5"
              onSubmit={handlePlaceOrder}
            >
              <div className="flex flex-wrap justify-between gap-y-6 w-full">
                <Input
                  isRequired
                  name="firstname"
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Enter your first name"
                  className="md:w-[48%]"
                  autoComplete="given-name"
                />

                <Input
                  isRequired
                  name="lastname"
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Enter your last name"
                  className="md:w-[48%]"
                  autoComplete="family-name"
                />

                <Input
                  isRequired
                  name="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="email"
                  defaultValue={user?.email || ""}
                  className="md:w-[48%]"
                  autoComplete="email"
                />

                <Input
                  isRequired
                  name="phone"
                  label="Phone Number"
                  labelPlacement="outside"
                  placeholder="Enter your phone number"
                  type="tel"
                  className="md:w-[48%]"
                  autoComplete="tel"
                />
              </div>

              <Input
                isRequired
                name="address"
                label="Address"
                labelPlacement="outside"
                placeholder="Enter your street address"
                autoComplete="street-address"
              />

              <div className="flex flex-wrap justify-between gap-y-6 w-full">
                <Input
                  isRequired
                  name="city"
                  label="City"
                  labelPlacement="outside"
                  placeholder="City"
                  className="md:w-[48%]"
                  autoComplete="address-level2"
                />

                <Input
                  name="PostCode"
                  label="Post Code"
                  labelPlacement="outside"
                  placeholder="Post code"
                  className="md:w-[48%]"
                  autoComplete="postal-code"
                />

                <Input
                  isRequired
                  name="country"
                  label="Country"
                  labelPlacement="outside"
                  placeholder="Country"
                  className="md:w-[48%]"
                  autoComplete="country-name"
                />

                <Input
                  isRequired
                  name="region"
                  label="Region / State"
                  labelPlacement="outside"
                  placeholder="Region or state"
                  className="md:w-[48%]"
                  autoComplete="address-level1"
                />
              </div>

              <div className="flex justify-end w-full mt-2">
                <Button
                  type="submit"
                  isDisabled={submitting || cartItems.length === 0}
                  isLoading={submitting}
                  className="w-full md:w-auto text-sm md:text-base bg-primary text-white rounded px-6"
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
