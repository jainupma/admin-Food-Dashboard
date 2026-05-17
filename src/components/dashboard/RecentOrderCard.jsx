import { useEffect, useRef, useState } from "react";
import { ordersData } from "../../constants/dashboardContent";
import {
  ChevronDown,
  ReceiptIndianRupee,
  Check,
  X,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const RecentOrderCard = () => {
    const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  const order = ordersData[0];

  const [status, setStatus] = useState(order.status);
  const [openPopover, setOpenPopover] = useState(false);

  const popoverRef = useRef(null);

  const handleAccept = () => {
    setStatus("Accepted");
    setOpenPopover(false);
  };

  const handleDecline = () => {
    setStatus("Declined");
    setOpenPopover(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setOpenPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">

      {/* ================= CARD ================= */}
      <div className={`relative rounded-[28px] border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${styles.card}`}>

        <div className="h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-500" />

        <div className="p-6">

          <div className="flex justify-between items-start">

            {/* USER */}
            <div className="flex items-center gap-4">

              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-16 h-16 rounded-2xl border shadow"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {order.customer}
                </h2>

                <p className="text-xs text-gray-400">
                  Order ID #{order.id}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    status === "Accepted"
                      ? "bg-green-100 text-green-600"
                      : status === "Declined"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>

            {/* AMOUNT + BUTTON */}
            <div className="text-right">

              <div className="flex items-center justify-end gap-1">
                <ReceiptIndianRupee
                  size={18}
                  className="text-orange-500"
                />
                <span className="text-xl font-bold">
                  {order.amount}
                </span>
              </div>

              <p className="text-xs text-gray-400">Total</p>

              {/* TOGGLE POPUP */}
              <button
                onClick={() => setOpenPopover(!openPopover)}
                className="mt-3 w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center transition"
              >
                <ChevronDown size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= POPOVER ================= */}
      {openPopover && (
        <div
          ref={popoverRef}
          className="absolute right-6 top-24 w-[360px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-50"
        >

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="text-orange-500" />
            <h3 className="font-semibold">Order Details</h3>
          </div>

          {/* ITEM */}


          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">

            <button
              onClick={handleAccept}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-xl hover:bg-green-600 transition"
            >
              <Check size={16} />
              Accept
            </button>

            <button
              onClick={handleDecline}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 transition"
            >
              <X size={16} />
              Decline
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default RecentOrderCard;