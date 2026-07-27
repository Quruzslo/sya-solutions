import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ReviewCard({ revData }) {
  const fullStars = Math.floor(revData.stars);

  const hasHalfStar = revData.stars % 1 !== 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Csillagok sora */}
      <div className="flex flex-row items-center gap-1 text-amber-500">
        {Array.from({ length: fullStars }).map((_, idx) => (
          <FaStar key={`full-${idx}`} size={14} />
        ))}
        {hasHalfStar && <FaStarHalfAlt size={14} />}
      </div>

      <div className="w-full h-[4px] rounded-full bg-stone-200 transform-origin-left hover:bg-zold/50" />
      <p>{revData.content}</p>
      <h3>{revData.name}</h3>
    </div>
  );
}
