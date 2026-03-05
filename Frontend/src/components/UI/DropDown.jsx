function DropDown({ dropDownList }) {
  return (
    <div className="absolute z-20 bg-green-950/80 mt-2  p-2 rounded-md w-full backdrop-blur-2xl">
      {dropDownList.map((dropDown) => {
        const Icon = dropDown.icon;

        return (
          <button
            onClick={dropDown.onClick}
            className="text-xs hover:bg-green-900 rounded text-center flex justify-center items-center gap-1 font-semibold p-2 py-3 cursor-pointer"
          >
            <Icon size={15} />
            {dropDown.label}
          </button>
        );
      })}
    </div>
  );
}

export default DropDown;
