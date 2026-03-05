function UploadSpinner() {
  return (
    <div className="flex flex-col h-full justify-center items-center my-2">
      <div className="w-5 h-5 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-[#1DB954] mt-1">Uploading...</span>
    </div>
  );
}

export default UploadSpinner;
