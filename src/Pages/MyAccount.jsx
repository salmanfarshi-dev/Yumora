import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit2,
  FiSave,
  FiX,
  FiLogOut,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import PageBreadcrumb from "../Components/PageBreadcrumb";

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);

        navigate("/account", {
          replace: true,
          state: { from: "/my-account" },
        });

        return;
      }

      setUser(currentUser);

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        const data = userSnap.exists() ? userSnap.data() : {};

        const userProfile = {
          name: data.name || currentUser.displayName || "",
          email: currentUser.email || data.email || "",
          phone: data.phone || "",
        };

        setProfile(userProfile);

        setFormData({
          name: userProfile.name,
          phone: userProfile.phone,
        });
      } catch (error) {
        console.error("Profile loading error:", error);
        toast.error("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user || saving) return;

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();

    if (!cleanName || !cleanPhone) {
      toast.error("Name and phone number are required.");
      return;
    }

    setSaving(true);

    try {
      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      const profileData = {
        uid: user.uid,
        name: cleanName,
        email: user.email || profile.email,
        phone: cleanPhone,
        updatedAt: serverTimestamp(),
      };

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          name: cleanName,
          phone: cleanPhone,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(userRef, {
          ...profileData,
          createdAt: serverTimestamp(),
        });
      }

      await updateProfile(user, {
        displayName: cleanName,
      });

      setProfile((prev) => ({
        ...prev,
        name: cleanName,
        phone: cleanPhone,
      }));

      setEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      phone: profile.phone,
    });

    setEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success("Logged out successfully!");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Unable to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your account...
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="text-slate-600">Redirecting to registration...</p>
        </div>
      </section>
    );
  }

  return (
    <section >
      <PageBreadcrumb title="My Account"/>
     <div className="min-h-[80vh] bg-slate-50 px-4 py-10 md:py-16">
       <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            YUMORA CUSTOMER SPACE
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            My Account
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-red-700 rounded-3xl p-7 text-white shadow-xl shadow-red-950/10">
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-red-400/20 blur-3xl" />

              <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-rose-500/20 blur-3xl" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-red-500/15 border border-red-300/30 flex items-center justify-center">
                  <FiUser className="text-4xl text-red-100" />
                </div>

                <h2 className="mt-5 text-xl font-bold break-words">
                  {profile.name || "Customer"}
                </h2>

                <p className="mt-2 text-sm text-red-100 break-all">
                  {profile.email}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-red-100">
                  <FiShield className="shrink-0" />
                  <span>Firebase authenticated account</span>
                </div>

                <div className="mt-7 border-t border-red-300/20 pt-5">
                  <Link
                    to="/productlist"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15 transition"
                  >
                    <FiShoppingBag className="text-lg" />

                    <span className="text-sm font-semibold">
                      Continue Shopping
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-red-100 hover:bg-white/10 transition"
                  >
                    <FiLogOut className="text-lg" />

                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View and update your profile details.
                  </p>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-semibold text-white transition shadow-lg shadow-red-100"
                  >
                    <FiEdit2 />
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                      <input
                        type="text"
                        name="name"
                        value={editing ? formData.name : profile.name}
                        onChange={handleChange}
                        readOnly={!editing}
                        required
                        className={`w-full rounded-xl border py-3.5 pl-11 pr-4 outline-none transition ${
                          editing
                            ? "border-red-200 bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                      <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-500 outline-none"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Email changes require a separate verification process.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                      <input
                        type="tel"
                        name="phone"
                        value={editing ? formData.phone : profile.phone}
                        onChange={handleChange}
                        readOnly={!editing}
                        required
                        className={`w-full rounded-xl border py-3.5 pl-11 pr-4 outline-none transition ${
                          editing
                            ? "border-red-200 bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                        placeholder="+8801XXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                {editing && (
                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
                    >
                      <FiX />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-60 shadow-lg shadow-red-100"
                    >
                      <FiSave />
                      {saving ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </div>
                )}

                <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <FiShield className="mt-0.5 text-red-600 text-lg shrink-0" />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Your account is protected
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Your profile is associated with your authenticated
                        Firebase account. Your password is managed by Firebase
                        Authentication and is not displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     </div>
    </section>
  );
}

export default MyAccount;
