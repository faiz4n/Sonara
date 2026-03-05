function AlbumItem({ title }) {
  return (
    <div>
      <div className="w-40 flex flex-col gap-2 ">
        <div className="relative z-0 overflow-hidden rounded-2xl cursor-pointer">
          <img
            src="https://i.pinimg.com/736x/dc/9e/9f/dc9e9f3f9eccc935e4553d9a441ea830.jpg"
            alt=""
            className="w-full h-full  hover:scale-110 z-0 transition ease-in duration-300"
          />
        </div>
        <h1 className="p-1 text-sm font-semibold">{title}</h1>
      </div>
    </div>
  );
}

export default AlbumItem;
