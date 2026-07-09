function Button({ children, size, variation }) {
  const sizes = {
    small:
      "gap-1 md:gap-2 px-2 py-3 md:px-5 md:py-2 rounded-md md:text-md text-sm",
  };
  const variations = {
    primary: "text-white bg-primary-700 hover:bg-primary-800",
  };
  return (
    <button
      className={`flex items-center font-sansMed cursor-pointer transition-all duration-300 ${sizes[size]} ${variations[variation]}`}
    >
      {children}
    </button>
  );
}

export default Button;
