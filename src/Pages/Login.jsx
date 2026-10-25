import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import PageBreadcrumb from "../Components/PageBreadcrumb";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FiLock, FiShield, FiArrowRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function Login() {
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loading) return;

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successful!");

      const redirectTo = location.state?.from || "/my-account";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Login error:", error.code, error.message);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        toast.error("Incorrect email or password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your internet.");
      } else if (error.code === "auth/user-disabled") {
        toast.error("This account has been disabled.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    inputWrapper:
      "h-12 border-slate-200 hover:border-red-400 shadow-none focus-within:border-red-500 transition-colors",
  };

  return (
    <>
      <PageBreadcrumb title="Login" />

      <section className="min-h-[75vh] bg-slate-50 py-10 md:py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/70 border border-slate-100">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-red-700 p-7 md:p-12 lg:p-14 text-white flex flex-col justify-between min-h-[300px] lg:min-h-[600px]">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-red-500/20 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-rose-600/20 blur-3xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-400/30 flex items-center justify-center">
                <FiShield className="text-2xl text-red-300" />
              </div>

              <p className="mt-8 text-red-200 text-sm font-semibold uppercase tracking-[0.2em]">
                Welcome Back
              </p>

              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                Sign in to
                <br />
                your account.
              </h1>

              <p className="mt-5 text-slate-300 text-sm md:text-base leading-7 max-w-md">
                Welcome back to Yumora. Log in to manage your account, continue
                shopping, and enjoy a smoother checkout experience.
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <div className="border-t border-red-400/20 pt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-400/20 flex items-center justify-center">
                  <FiLock className="text-red-300 text-lg" />
                </div>

                <div>
                  <p className="font-semibold text-sm">Secure Login</p>

                  <p className="text-slate-300 text-xs mt-1">
                    Protected with Firebase Authentication
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9 md:p-12 lg:p-14 flex items-center">
            <div className="max-w-md w-full mx-auto">
              <div className="flex justify-center items-center mb-6">
                <img
                  src="/logo (2).png"
                  alt="Yumora"
                  className="w-30 object-contain"
                />
              </div>

              <p className="text-red-600 font-semibold text-sm tracking-wider">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Login to Account
              </h2>

              <p className="text-slate-500 text-sm mt-3 leading-6">
                Enter your registered email and password to continue.
              </p>

              <Form
                onSubmit={handleLogin}
                className="w-full mt-8 flex flex-col gap-5"
              >
                <div className="w-full">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <Input
                    isRequired
                    name="email"
                    labelPlacement="outside"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    startContent={
                      <span className="text-slate-400 text-lg">@</span>
                    }
                    errorMessage="Please enter a valid email address"
                    variant="bordered"
                    radius="lg"
                    classNames={inputStyles}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Input
                      isRequired
                      name="password"
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      type={eye ? "text" : "password"}
                      autoComplete="current-password"
                      startContent={
                        <FiLock className="text-slate-400 text-lg shrink-0" />
                      }
                      errorMessage="Please enter your password"
                      variant="bordered"
                      radius="lg"
                      classNames={inputStyles}
                    />

                    <button
                      type="button"
                      onClick={() => setEye((previous) => !previous)}
                      aria-label={eye ? "Hide password" : "Show password"}
                      className="absolute right-4 top-[14px] z-10 text-xl text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      {eye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 w-full mt-2">
                  <Button
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                    className="w-full sm:w-auto h-12 px-7 bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-200 hover:from-red-700 hover:to-rose-600 transition-all duration-300"
                  >
                    {loading ? "Logging in..." : "Login"}
                    {!loading && <FiArrowRight className="text-lg" />}
                  </Button>

                  <Link
                    to="/account"
                    state={{
                      from: location.state?.from || "/my-account",
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      type="button"
                      className="w-full h-12 px-6 bg-white border border-red-200 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </Form>

              <p className="text-sm text-gray-500 text-center mt-7">
                Don't have an account?{" "}
                <Link
                  to="/account"
                  state={{
                    from: location.state?.from || "/my-account",
                  }}
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline"
                >
                  Register here
                </Link>
              </p>

              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
                >
                  ← Back to Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
