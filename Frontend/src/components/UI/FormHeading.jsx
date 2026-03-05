function FormHeading({ heading, caption, icon }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2 mb-2">
      {icon && (
        <div className="bg-green-600/20 p-2 rounded">
          <Icon size={20} color="green" />
        </div>
      )}
      <div className="flex flex-col ">
        <h1 className="font-bold text-xl">{heading}</h1>
        {caption && <p className="text-xs text-zinc-300/80">{caption}</p>}
      </div>
    </div>
  );
}

export default FormHeading;
