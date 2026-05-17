"use client";

const CommonButton = ({
  children,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {

  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white",

    orange:
      "bg-orange-50 hover:bg-orange-100 text-orange-600",

    green:
      "bg-green-50 hover:bg-green-100 text-green-600",

    red:
      "bg-red-50 hover:bg-red-100 text-red-600",

    outline:
      "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2.5
        rounded-xl
        text-sm font-medium
        transition-all duration-200
        whitespace-nowrap
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && icon}

      {children}
    </button>
  );
};

export default CommonButton;