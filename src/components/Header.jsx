import { Bell, Moon, Search, Sun } from "lucide-react";
import { userData } from "../constants/headerData";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";

const Header = () => {

    const { theme, toggleTheme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  return (
    <div className={`flex items-center justify-end  p-4 shadow border-b border-gray-400 ${styles.page}`}>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                    onClick={toggleTheme}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    >
                      {darkMode ? (
                        <Sun
                          size={20}
                          className="text-white"
                        />
                      ) : (
                        <Moon
                          size={20}
                          className="text-black"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={userData.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold font-heading">
              {userData.name}
            </p>
            <p className="text-xs text-gray-500">{userData.role}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;