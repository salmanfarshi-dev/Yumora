function ProductSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-[15px] border border-gray-200 bg-white p-3 animate-pulse">
      <div className="h-48 w-full rounded-xl bg-gray-200 sm:h-56" />

      <div className="mt-4 h-4 w-4/5 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-full rounded bg-gray-200" />
      <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />

      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>

      <div className="mt-4 h-10 w-full rounded-lg bg-gray-200" />
    </div>
  );
}

export default ProductSkeleton;
