import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { useLocation, useNavigate, Link } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "../firebase";

function Account() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: cleanName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully!");

      const redirectTo = location.state?.from || "/checkout";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Registration error:", error);

      const errorMessages = {
        "auth/email-already-in-use":
          "This email is already registered. Try another email.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password":
          "Your password is too weak. Use at least 6 characters.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection.",
        "auth/operation-not-allowed":
          "Email/Password sign-up is not enabled in Firebase.",
        "permission-denied":
          "Unable to save your profile. Check your Firestore rules.",
      };

      toast.error(
        errorMessages[error.code] ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-slate-50 py-10 md:py-16 px-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#0F172A",
            color: "#FFFFFF",
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/70 border border-slate-100">
        {/* Left Side */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-7 md:p-12 lg:p-14 text-white flex flex-col justify-between min-h-[300px] lg:min-h-[700px]">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <FiShield className="text-2xl" />
            </div>

            <p className="mt-8 text-blue-200 text-sm font-semibold uppercase tracking-[0.2em]">
              Welcome to our store
            </p>

            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
              Create your
              <br />
              account today.
            </h1>

            <p className="mt-5 text-slate-300 text-sm md:text-base leading-7 max-w-md">
              Join us for a smoother shopping experience. Save your details
              and make your next checkout easier.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="border-t border-white/20 pt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/15 flex items-center justify-center">
                <FiLock className="text-emerald-300 text-lg" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure registration</p>
                <p className="text-slate-300 text-xs mt-1">
                  Protected with Firebase Authentication
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-6 sm:p-9 md:p-12 lg:p-14">
          <div className="max-w-md mx-auto">
            <p className="text-primary font-semibold text-sm">
              GET STARTED
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Create Account
            </h2>

            <p className="text-slate-500 text-sm mt-3 leading-6">
              Enter your details below to create your customer account.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <Input
                  value={name}
                  onValueChange={setName}
                  placeholder="Enter your full name"
                  startContent={
                    <FiUser className="text-slate-400 text-lg shrink-0" />
                  }
                  variant="bordered"
                  radius="lg"
                  isRequired
                  autoComplete="name"
                  classNames={{
                    inputWrapper:
                      "h-12 border-slate-200 hover:border-blue-400 shadow-none",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <Input
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                  placeholder="you@example.com"
                  startContent={
                    <FiMail className="text-slate-400 text-lg shrink-0" />
                  }
                  variant="bordered"
                  radius="lg"
                  isRequired
                  autoComplete="email"
                  classNames={{
                    inputWrapper:
                      "h-12 border-slate-200 hover:border-blue-400 shadow-none",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>

                <Input
                  type="tel"
                  value={phone}
                  onValueChange={setPhone}
                  placeholder="+8801XXXXXXXXX"
                  startContent={
                    <FiPhone className="text-slate-400 text-lg shrink-0" />
                  }
                  variant="bordered"
                  radius="lg"
                  isRequired
                  autoComplete="tel"
                  classNames={{
                    inputWrapper:
                      "h-12 border-slate-200 hover:border-blue-400 shadow-none",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                  placeholder="Minimum 6 characters"
                  startContent={
                    <FiLock className="text-slate-400 text-lg shrink-0" />
                  }
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="text-slate-400 hover:text-primary"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                  variant="bordered"
                  radius="lg"
                  isRequired
                  autoComplete="new-password"
                  classNames={{
                    inputWrapper:
                      "h-12 border-slate-200 hover:border-blue-400 shadow-none",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>

                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onValueChange={setConfirmPassword}
                  placeholder="Re-enter your password"
                  startContent={
                    <FiLock className="text-slate-400 text-lg shrink-0" />
                  }
                  endContent={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="text-slate-400 hover:text-primary"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                  variant="bordered"
                  radius="lg"
                  isRequired
                  autoComplete="new-password"
                  classNames={{
                    inputWrapper:
                      "h-12 border-slate-200 hover:border-blue-400 shadow-none",
                  }}
                />
              </div>

              <Button
                type="submit"
                isLoading={loading}
                isDisabled={loading}
                className="w-full h-12 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-200 hover:opacity-90"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <FiArrowRight className="text-lg" />}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-slate-600 leading-5">
                Your password is handled by Firebase Authentication and is
                never stored in your customer profile document.
              </p>
            </div>

            <p className="text-xs text-slate-400 text-center mt-6">
              By creating an account, you agree to our store policies.
            </p>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;