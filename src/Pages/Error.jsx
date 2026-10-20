import React from "react";
import { Link, useNavigate } from "react-router";
import { FiArrowLeft, FiArrowRight, FiHome } from "react-icons/fi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Error() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-200/40 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#111827]"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25">
              Y
            </span>
            Yumora<span className="text-blue-600">.</span>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_-20px_rgba(15,23,42,0.12)]">
          <div className="grid md:grid-cols-2 items-center">
            <div className="px-6 py-12 sm:px-10 md:px-12 md:py-16 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
                <HiOutlineExclamationTriangle className="text-lg" />
                Error 404
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#111827]">
                Oops! Page
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Not Found
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-500">
                Looks like you've taken a wrong turn. The page you're looking
                for doesn't exist or may have been moved to another location.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <FiHome className="text-lg" />
                  Back to Home
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
                >
                  <FiArrowLeft className="text-lg" />
                  Go Back
                </button>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-px w-10 bg-gray-300" />
                <p className="text-xs font-medium tracking-wide text-gray-400">
                  DON'T WORRY, IT HAPPENS
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#EEF2FF] px-6 py-12 order-1 md:order-2 md:min-h-[550px]">
              <div className="absolute w-64 h-64 rounded-full border border-blue-200/70" />
              <div className="absolute w-80 h-80 rounded-full border border-violet-200/60" />
              <div className="absolute w-96 h-96 rounded-full border border-blue-100/70" />

              <div className="absolute top-16 right-12 w-4 h-4 rounded-full bg-violet-400 animate-pulse" />
              <div className="absolute bottom-20 left-12 w-3 h-3 rounded-full bg-blue-500 animate-ping" />

              <div className="relative animate-[float_4s_ease-in-out_infinite]">
                <div className="absolute -top-8 -right-8 z-20 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl border border-white bg-white shadow-xl shadow-violet-200/50">
                  <HiOutlineExclamationTriangle className="text-3xl text-violet-600" />
                </div>

                <div className="w-64 sm:w-80 rounded-3xl border border-white/80 bg-white/90 p-5 shadow-2xl shadow-blue-200/50 backdrop-blur-md">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />

                    <div className="ml-3 flex-1 rounded-md bg-gray-100 px-3 py-1.5 text-center text-[10px] text-gray-400">
                      Yumora.com/page
                    </div>
                  </div>

                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-100 to-violet-100">
                      <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        className="h-20 w-20"
                      >
                        <path
                          d="M25 15H60L78 33V82C78 85 75 88 72 88H25C21 88 18 85 18 82V21C18 18 21 15 25 15Z"
                          stroke="#6366F1"
                          strokeWidth="4"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M60 15V33H78"
                          stroke="#6366F1"
                          strokeWidth="4"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M34 49H62M34 61H54"
                          stroke="#818CF8"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <circle cx="66" cy="72" r="14" fill="#4F46E5" />
                        <path
                          d="M62 68L70 76M70 68L62 76"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <h2 className="mt-5 text-2xl font-extrabold text-gray-800">
                      404
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      We couldn't find this page
                    </p>

                    <div className="mx-auto mt-5 h-2 w-32 rounded-full bg-gray-100" />
                    <div className="mx-auto mt-2 h-2 w-20 rounded-full bg-gray-100" />
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-6 rounded-2xl border border-white bg-white px-5 py-3 shadow-xl shadow-blue-200/50">
                  <p className="text-xs font-medium text-gray-400">
                    ERROR CODE
                  </p>
                  <p className="text-xl font-extrabold tracking-widest text-blue-600">
                    404
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Qelviro. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}

export default Error;
