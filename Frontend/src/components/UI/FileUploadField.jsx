function FileUploadField({
  handleFileChange,
  isUploading,
  fileName,
  icon: Icon,
  label,
  types,
}) {
  return (
    <label className="border-2 border-zinc-400/40 border-dashed flex-1 flex flex-col h-full rounded-xl bg-green-100/15 justify-center items-center p-6 cursor-pointer break-all">
      {Icon && <Icon size={20} color="#9f9fa9" className="shrink-0" />}
      {!fileName && (
        <p className="text-xs my-3 text-zinc-300 text-center">{label}</p>
      )}
      {fileName && (
        <p className="text-xs my-3 text-zinc-300 text-center">{fileName}</p>
      )}

      <input
        type="file"
        accept={types}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </label>
  );
}

export default FileUploadField;
