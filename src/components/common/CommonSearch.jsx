"use client";

import { Search } from "lucide-react";

const CommonSearch = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-4 py-3
          rounded-2xl
          border border-gray-200
          bg-white
          outline-none
          text-gray-400
          focus:border-orange-300
          focus:ring-4 focus:ring-orange-100
          transition-all
        "
      />
    </div>
  );
};

export default CommonSearch;