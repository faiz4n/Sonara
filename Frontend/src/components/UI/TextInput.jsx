function TextInput({
  placeholder = "",
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <>
      <p className="text-[11px] my-1 text-zinc-200">{label}</p>
      <input
        type={type}
        placeholder={`${placeholder}`}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        className={`bg-green-100/15 px-3 py-2 rounded w-full outline-0 text-xs placeholder:text-xs ${error ? "border border-red-500" : ""}`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1 mb-1">{error}</p>}
      {!error && <div className="mb-2" />}
    </>
  );
}

export default TextInput;
