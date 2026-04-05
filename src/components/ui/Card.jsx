export default function Card({className = "", children, ...props}) {
  return (
    <div
      className={`${className} p-4 transition-all rounded-3xl bg-blue-200 border-indigo-950 text-indigo-950 shadow-lg bg-main border-4 border-r-2 border-b-8 bottom-right-shadow`.trim()}
      {...props}>
      {children}
    </div>
  );
}
