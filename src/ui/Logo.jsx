function Logo({ className = "" }) {
  return (
    <img
      className={`h-auto ${className}`}
      src="/logo2.png"
      alt="Agahino logo"
    />
  );
}

export default Logo;
