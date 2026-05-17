import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const CommonStatsCard = ({
  title,
  value,
  icon,
  iconBg = "bg-gray-100",
  iconColor = "text-gray-600",
}) => {
   const { theme } = useTheme();
  
    const darkMode = theme === "dark";
    const styles = getThemeStyles(darkMode);
  return (
    <div className={`rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-sm w-full ${styles.card}`}>
      <div className="flex items-center justify-between gap-3">
        
        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <p className={`text-xs sm:text-sm text-gray-400 truncate ${styles.heading}`}>
            {title}
          </p>

          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 mt-1 sm:mt-2 break-words ${styles.subText}`}>
            {value}
          </h2>
        </div>

        {/* ICON */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <div className={`${iconColor} scale-90 sm:scale-100`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonStatsCard;