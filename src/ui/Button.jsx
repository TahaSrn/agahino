function Button({ children, size, variation }) {
  const sizes = {
    small: "gap-2 px-5 py-2 rounded-md",
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
