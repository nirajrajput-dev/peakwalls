interface SkeletonCardProps {
  index: number;
}

export default function SkeletonCard({ index }: SkeletonCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="w-full animate-pulse">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-8 items-center`}
      >
        {/* Image skeleton - matches TitleCard size */}
        <div className="w-full lg:w-[58%] aspect-video bg-gray-800 rounded"></div>

        {/* Text skeleton - center aligned */}
        <div className="w-full lg:w-[42%] flex flex-col gap-4 items-center justify-center">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="h-6 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
