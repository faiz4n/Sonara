function Header({ heading, caption }) {
  return (
    <div className="px-11 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-extrabold text-4xl ">{heading}</h1>
        {caption && <p className="text-xs text-zinc-400">{caption}</p>}
      </header>
    </div>
  );
}

export default Header;
