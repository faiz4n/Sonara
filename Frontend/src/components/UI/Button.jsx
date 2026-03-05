function Button({ label, icon: Icon, onClick, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex mt-3 gap-2  justify-center  items-center text-sm rounded-md font-bold p-3  bg-green-600 cursor-pointer hover:bg-green-600/90 w-full`}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
}

export default Button;
