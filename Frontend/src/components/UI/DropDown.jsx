function DropDown({ dropDownList }) {
  return (
    <div className="fixed bottom-42 right-5 z-20 bg-green-950/80 p-2 rounded-md w-41 backdrop-blur-2xl shadow-lg">
      {dropDownList.map((dropDown, index) => {
        const Icon = dropDown.icon;

        return (
          <button
            key={index}
            onClick={dropDown.onClick}
            className="w-full text-xs hover:bg-green-900 rounded text-center flex justify-center items-center gap-1 font-semibold p-2 py-3 cursor-pointer"
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
