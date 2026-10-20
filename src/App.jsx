import React from "react";
import { Route, Routes } from "react-router";
import Rootlayout from "./Pages/Rootlayout";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import AboutUs from "./Pages/AboutUs";
import BlogRightwide from "./Pages/BlogRightwide";
import Card from "./Pages/Card";
import Checkout from "./Pages/Checkout";
import Faq from "./Pages/Faq";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductsDetails";
import Wishlist from "./Pages/Wishtlist";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import { Toaster } from "react-hot-toast";
import Error from "./Pages/Error";
import Account from "./Pages/Account";
import MyAccount from "./Pages/MyAccount";

function App() {
  return (
    <>
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
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="blogright" element={<BlogRightwide />} />
          <Route path="card" element={<Card />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="faq" element={<Faq />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="productdetails/:id" element={<ProductDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="my-account" element={<MyAccount />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
