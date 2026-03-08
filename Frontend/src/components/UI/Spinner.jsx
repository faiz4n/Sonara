function Spinner({ message }) {
  return (
    <div className="flex flex-col h-full justify-center items-center my-2">
      <div className="w-10 h-10 border-5 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-[#1DB954] mt-1">{message}</span>
    </div>
  );
}

export default Spinner;
