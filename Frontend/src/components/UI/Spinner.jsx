function Spinner({ message }) {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-black/50 backdrop-blur-sm fixed inset-0">
      <div className="w-10 h-10 border-5 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-[#1DB954] mt-4">{message}</span>
    </div>
  );
}

export default Spinner;
