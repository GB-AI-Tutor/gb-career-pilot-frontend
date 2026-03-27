const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:opacity-50",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
