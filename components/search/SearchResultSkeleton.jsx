export default function SearchResultSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-[180px] h-[180px] bg-gray-200 animate-pulse shrink-0">
                <div className="absolute bottom-2 left-2 h-5 w-16 bg-gray-300 rounded animate-pulse" />
              </div>
              <div className="flex-1 p-4">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
                <div className="mt-4">
                  <div className="h-7 w-1/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-26 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
