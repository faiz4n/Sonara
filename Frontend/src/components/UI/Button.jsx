function Button({
  label,
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex mt-3 gap-2  justify-center  items-center text-sm rounded-md font-bold p-3  ${
        disabled
          ? "bg-green-600/50 cursor-not-allowed opacity-75"
          : "bg-green-600 cursor-pointer hover:bg-green-600/90"
      } w-full text-white`}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
}

export default Button;
