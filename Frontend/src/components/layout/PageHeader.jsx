function PageHeader({ heading, caption }) {
  return (
    <div className="px-8 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-extrabold text-4xl ">{heading}</h1>
        {caption && <p className="text-xs text-zinc-400">{caption}</p>}
      </header>
    </div>
  );
}

export default PageHeader;
