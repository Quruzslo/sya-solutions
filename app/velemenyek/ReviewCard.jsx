import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa6";

export default function ReviewCard({ revData }) {
  const fullStars = Math.floor(revData.stars);

  const hasHalfStar = revData.stars % 1 !== 0;

  return (
    <div className="flex flex-col   p-[10px] rounded-md group ">
      <div className="flex flex-col gap-4 bg-feher shadow-[0px_13px_27px_-5px_rgba(50,50,93,0.25),0px_8px_16px_-8px_rgba(0,0,0,0.3)] text-text-alap rounded-xl p-[10px]">
        {/* Csillagok sora */}
        <div className="flex flex-row items-center gap-1 text-amber-300">
          {Array.from({ length: fullStars }).map((_, idx) => (
            <FaStar
              key={`full-${idx}`}
              size={14}
              className="drop-shadow-[0_2px_1px_rgba(0,0,0,0.65)]"
            />
          ))}
          {hasHalfStar && <FaStarHalfAlt size={14} />}
        </div>

        <div className="w-full h-[6px] rounded-full bg-stone-200 overflow-hidden">
          <div className="w-full h-full bg-zold/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </div>
        <div className="flex flex-col gap-3 my-[20px]">
          <FaQuoteRight />
          <p>{revData.content}</p>
          <FaQuoteRight className="ml-auto" />
        </div>
      </div>

      <div className="flex flex-row p-[10px] gap-[15px] items-center justify-between bg-transparent w-fit rounded-xl text-text-alap mx-auto ">
        <h3 className="!text-[15px] font-bold">{revData.name}</h3>
        <p className="!text-[15px] font-bold text-stone-400">
          {new Date(revData.date).toLocaleDateString("hu-HU")}
        </p>
      </div>
    </div>
  );
}
