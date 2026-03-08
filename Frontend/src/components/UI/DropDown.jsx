function DropDown({ dropDownList, className }) {
  return (
    <div className={className}>
      {dropDownList.map((dropDown, index) => {
        const Icon = dropDown.icon;

        return (
          <div
            key={index}
            onClick={dropDown.onClick}
            className="w-full text-xs hover:bg-green-900 rounded text-center flex justify-start items-center gap-2 font-semibold p-2 py-3 cursor-pointer"
          >
            <Icon size={15} />
            {dropDown.label}
          </div>
        );
      })}
    </div>
  );
}

export default DropDown;
