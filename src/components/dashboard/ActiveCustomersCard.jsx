import { Users, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const ActiveCustomersCard = () => {
    const { theme } = useTheme();
  
    const darkMode = theme === "dark";
    const styles = getThemeStyles(darkMode);
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 px-5 py-2 mt-2 ${styles.card}`}>

      {/* Soft Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-50" />

      <div className="relative z-10">

        {/* Top Section */}
        <div className="flex items-center justify-between">

          {/* Left */}
          <div>

            <p className={`text-xs font-medium tracking-wide text-gray-900 uppercase ${styles.heading}`}>
              Active Customers
            </p>

            <div className="flex items-end gap-2 mt-2">

              <h2 className={`text-3xl font-bold text-gray-800 leading-none ${styles.label}`}>
                245
              </h2>

              <span className="flex items-center gap-1 text-[11px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mb-1">
                <TrendingUp size={12} />
                +12%
              </span>

            </div>

            <p className={`text-xs text-gray-900 mt-1 ${styles.subText}`}>
              Increased from last week
            </p>

          </div>

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-sm">

            <Users
              size={22}
              className="text-orange-500"
            />

          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

          {/* Returning */}
          <div>
            <p className={`text-[11px] uppercase tracking-wide text-gray-900 ${styles.heading}`}>
              Returning
            </p>

            <h3 className={`text-lg font-semibold text-gray-800 mt-1 ${styles.subText}`}>
              180
            </h3>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gray-100" />

          {/* New */}
          <div>
            <p className={`text-[11px] uppercase tracking-wide text-gray-900 ${styles.heading}`}>
              New
            </p>

            <h3 className={`text-lg font-semibold text-gray-800 mt-1 ${styles.subText}`}>
              65
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActiveCustomersCard;