export default function Button({className, children, ...props}) {
  return (
    <button
      className={`${className} border-3 border-b-6 rounded-3xl shadow text-4xl px-4 py-2 font-main text-shadow-sm transition-[bottom,opacity] duration-100 relative bottom-0 opacity-100 hover:enabled:opacity-80 hover:enabled:border-b-2 hover:enabled:mt-1 hover:enabled:-bottom-0.5 active:enabled:-bottom-1 active:opacity-50 cursor-pointer bottom-right-shadow-sm`.trim()}
      {...props}>
      {children}
    </button>
  );
}
