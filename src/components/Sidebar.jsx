import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  Users,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  Coins,
  PersonStanding,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";

const SidebarItem = ({ icon, label, to, collapsed }) => {
    const { theme } = useTheme();
  const darkMode = theme === "dark";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all font-body ${
         isActive
            ? darkMode
              ? "bg-white/10 text-white shadow-md"
              : "bg-gray-200 text-gray-900"
            : darkMode
            ? "text-slate-300 hover:bg-white/5 hover:text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar = () => {
  const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const restaurant = {
    logo: "/logo.png", // put logo inside public folder
  };

  return (
    <>
      {/* Mobile Toggle (Right Top) */}
      <button
        className="md:hidden p-3 fixed top-4 right-4 z-50 bg-white shadow rounded-lg"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen ${
          collapsed ? "w-20" : "w-64"
        }  shadow-md transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 z-40 ${styles.sidebar}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          
          {/* Logo */}
          <div
            className={`flex items-center ${
              collapsed ? "justify-center w-full" : "gap-3"
            }`}
          >
            <img
              src={restaurant.logo}
              alt="logo"
              className={`rounded-full transition-all duration-300 ${
                collapsed ? "w-10 h-10" : "w-16 h-16"
              }`}
            />

            {!collapsed && (
              <span className="font-heading text-lg">
                {restaurant.name}
              </span>
            )}
          </div>

          {/* Collapse Button (Desktop) */}
          <button
            className="hidden md:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Close Button (Mobile) */}
          <button
            className="md:hidden ml-2"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2">
          <SidebarItem
            icon={<Home />}
            label="Dashboard"
            to="/"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<ClipboardList />}
            label="Orders"
            to="/orders"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<ShoppingCart />}
            label="Menu"
            to="/menu"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Users />}
            label="Customers"
            to="/customers"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Coins />}
            label="Payments"
            to="/transaction"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<PersonStanding />}
            label="Delivery Track"
            to="/delivery"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Settings />} 
            label="Settings"
            to="/settings"
            collapsed={collapsed}
          />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;