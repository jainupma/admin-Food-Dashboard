import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-3xl",
})=> {

   const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      <div className={`w-[90%] ${width} rounded-3xl shadow-2xl p-6 relative ${styles.card}`}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-10 h-10 rounded-xl  hover:bg-gray-200 flex items-center justify-center ${styles.card}`}
        >
          <X size={18} />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
        )}

        {/* Content */}
        <div>{children}</div>

      </div>
    </div>
  );
};

export default Modal;