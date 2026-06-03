function Spinner({ message }) {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center py-20">
      <div className="w-10 h-10 border-5 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      {message && <span className="text-xs text-[#1DB954] mt-4">{message}</span>}
    </div>
  );
}

export default Spinner;
