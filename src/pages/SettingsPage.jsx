"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  User,
  Store,
  Bell,
  Shield,
  CreditCard,
  Moon,
  Sun,
  Upload,
  Save,
  Lock,
} from "lucide-react";

import CommonButton from "../components/common/CommonButton";
import CommonStatsCard from "../components/common/CommonStatsCard";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";


const SettingsPage = () => {
  const fileInputRef = useRef(null);

  const { theme, toggleTheme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  const [selectedFileName, setSelectedFileName] =
    useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      restaurantName: "",
      gstNumber: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      language: "English",
      currency: "INR (₹)",
    },
  });

  // ================= SUBMIT =================
  const onSubmit = (data) => {
    console.log("SETTINGS DATA =>", data);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${styles.page}`}
    >
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold ${styles.heading}`}
        >
          Settings
        </h1>

        <p className={`mt-2 ${styles.subText}`}>
          Manage your restaurant system preferences and
          configurations
        </p>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <CommonStatsCard
          title="Active Users"
          value="1,248"
          icon={<User size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Notifications"
          value="18"
          icon={<Bell size={24} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-500"
        />

        <CommonStatsCard
          title="Payment Methods"
          value="4"
          icon={<CreditCard size={24} />}
          iconBg="bg-green-100"
          iconColor="text-green-500"
        />

        <CommonStatsCard
          title="Security Status"
          value="Safe"
          icon={<Shield size={24} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-500"
        />
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ================= LEFT ================= */}
          <div className="xl:col-span-2 space-y-6">
            {/* PROFILE */}
            <div
              className={`rounded-3xl p-6 transition-all duration-300 ${styles.card}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <User
                    className="text-orange-500"
                    size={22}
                  />
                </div>

                <div>
                  <h2
                    className={`text-xl font-bold ${styles.heading}`}
                  >
                    Profile Settings
                  </h2>

                  <p className={`text-sm ${styles.subText}`}>
                    Manage your personal information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register("fullName")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>

                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>

                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="Enter phone"
                    {...register("phone")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>

                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Role
                  </label>

                  <input
                    type="text"
                    value="Administrator"
                    disabled
                    className={`w-full px-4 py-3 rounded-2xl border ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 text-slate-400"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* RESTAURANT */}
            <div
              className={`rounded-3xl p-6 transition-all duration-300 ${styles.card}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Store
                    className="text-green-500"
                    size={22}
                  />
                </div>

                <div>
                  <h2
                    className={`text-xl font-bold ${styles.heading}`}
                  >
                    Restaurant Settings
                  </h2>

                  <p className={`text-sm ${styles.subText}`}>
                    Update restaurant details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Restaurant Name
                  </label>

                  <input
                    type="text"
                    placeholder="Restaurant name"
                    {...register("restaurantName")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>

                <div>
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    GST Number
                  </label>

                  <input
                    type="text"
                    placeholder="GST number"
                    {...register("gstNumber")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`text-sm font-medium mb-2 block ${styles.label}`}
                  >
                    Restaurant Address
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Restaurant address"
                    {...register("address")}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none resize-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                  />
                </div>
              </div>

              {/* LOGO */}
              <div className="mt-6">
                <label
                  className={`text-sm font-medium mb-3 block ${styles.label}`}
                >
                  Upload Logo
                </label>

                <div
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                    darkMode
                      ? "border-slate-700 bg-slate-900"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                    <Upload
                      className="text-orange-500"
                      size={26}
                    />
                  </div>

                  <p
                    className={`font-semibold ${styles.heading}`}
                  >
                    Upload restaurant logo
                  </p>

                  <p className={`text-sm mt-1 ${styles.subText}`}>
                    PNG, JPG, JPEG up to 5MB
                  </p>

                  {selectedFileName && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-600 text-sm font-medium border border-orange-100">
                      {selectedFileName}
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("logo")}
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0];

                      if (file) {
                        setSelectedFileName(
                          file.name
                        );
                      }
                    }}
                  />

                  <div className="flex justify-center mt-5">
                    <CommonButton
                      type="button"
                      variant="primary"
                      icon={<Upload size={16} />}
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      {selectedFileName
                        ? "Choose Another File"
                        : "Choose File"}
                    </CommonButton>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <div
              className={`rounded-3xl p-6 transition-all duration-300 ${styles.card}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Lock
                    className="text-red-500"
                    size={22}
                  />
                </div>

                <div>
                  <h2
                    className={`text-xl font-bold ${styles.heading}`}
                  >
                    Security Settings
                  </h2>

                  <p className={`text-sm ${styles.subText}`}>
                    Manage passwords and authentication
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <input
                  type="password"
                  placeholder="Current Password"
                  {...register("currentPassword")}
                  className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                />

                <input
                  type="password"
                  placeholder="New Password"
                  {...register("newPassword")}
                  className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-100 transition-all ${styles.input}`}
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-6">
            {/* APP PREFS */}
            <div
              className={`rounded-3xl p-6 transition-all duration-300 ${styles.card}`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${styles.heading}`}
              >
                App Preferences
              </h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        darkMode
                          ? "bg-slate-800"
                          : "bg-gray-100"
                      }`}
                    >
                      {darkMode ? (
                        <Moon
                          size={20}
                          className="text-white"
                        />
                      ) : (
                        <Sun
                          size={20}
                          className="text-yellow-500"
                        />
                      )}
                    </div>

                    <div>
                      <h3
                        className={`font-semibold ${styles.heading}`}
                      >
                        Dark Mode
                      </h3>

                      <p
                        className={`text-xs ${styles.subText}`}
                      >
                        Enable dark appearance
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`w-14 h-7 rounded-full transition-all ${
                      darkMode
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                        darkMode
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* LANGUAGE */}
            <div
              className={`rounded-3xl p-6 transition-all duration-300 ${styles.card}`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${styles.heading}`}
              >
                Language & Region
              </h2>

              <div className="space-y-5">
                <select
                  {...register("language")}
                  className={`w-full px-4 py-3 rounded-2xl border outline-none ${styles.input}`}
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>

                <select
                  {...register("currency")}
                  className={`w-full px-4 py-3 rounded-2xl border outline-none ${styles.input}`}
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
            </div>

            {/* SAVE */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold">
                Save All Changes
              </h2>

              <p className="text-orange-100 mt-2 text-sm">
                Make sure all settings are updated
                properly.
              </p>

              <CommonButton
                type="submit"
                variant="secondary"
                className="mt-6 bg-white text-orange-600 hover:bg-orange-50"
                icon={<Save size={16} />}
              >
                Save Settings
              </CommonButton>
            </div>
          </div>
        </div>     
      </form>
    </div>
  );
};

export default SettingsPage;