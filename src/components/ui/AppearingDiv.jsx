export default function AppearingDiv({className, children, ...props}) {
  return (
    <div className={`animate-appear flex opacity-0 flex-col items-center ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

// className={`${appear ? "animate-appear flex" : "pointer-events-none hidden"}  opacity-0  flex-col items-center ${className}`.trim()}
