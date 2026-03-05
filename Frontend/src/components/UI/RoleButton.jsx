function RoleButton({ setRole, label, value, selectedRole, icon: Icon }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setRole(value);
      }}
      type="button"
      className={`flex gap-2 justify-center cursor-pointer items-center w-full text-xs p-2 font-semibold rounded transition-colors ${selectedRole === value ? "bg-green-600" : ""}`}
    >
      {Icon && <Icon size={13} />}
      {label}
    </button>
  );
}

export default RoleButton;
