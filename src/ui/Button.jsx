// ui/Button.jsx
function Button({ children, size, variation, className = "", onClick }) {
  const sizes = {
    small:
      "gap-1 md:gap-2 px-2 py-3 md:px-5 md:py-2 rounded-md md:text-md text-sm",
  };
  const variations = {
    primary: "text-white bg-primary-700 hover:bg-primary-800",
    secondary:
      "text-primary-100 bg-dark-700 hover:bg-dark-600 border border-white/10",
    outline:
      "text-primary-500 border border-primary-500 hover:bg-primary-500/10",
    ghost: "text-gray-400 hover:text-primary-400 hover:bg-dark-700/50",
  };
  return (
    <button
      onClick={onClick}
      className={`font-sansMed flex cursor-pointer items-center transition-all duration-300 ${sizes[size]} ${variations[variation]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
