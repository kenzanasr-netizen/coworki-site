function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="h-4 w-1/3 rounded-full bg-slate-200" />
          <div className="mt-4 h-3 w-full rounded-full bg-slate-100" />
          <div className="mt-3 h-3 w-2/3 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
