function Button({ children, size, variation, className = "" }) {
  const sizes = {
    small:
      "gap-1 md:gap-2 px-2 py-3 md:px-5 md:py-2 rounded-md md:text-md text-sm",
  };
  const variations = {
    primary: "text-white bg-primary-700 hover:bg-primary-800",
  };
  return (
    <button
      className={`font-sansMed flex cursor-pointer items-center transition-all duration-300 ${sizes[size]} ${variations[variation]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
