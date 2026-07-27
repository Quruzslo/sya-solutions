import { client } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ReviewCard from "./ReviewCard";

const getCachedReviews = unstable_cache(
  async () => {
    const db = client.db("main").collection("reviews");
    const reviews = await db.find({}).sort({ date: -1 }).toArray();

    return reviews;
  },
  ["reviews"],
  {
    revalidate: 3600,
    tags: ["reviews"],
  },
);

export default function Reviews() {
  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[120px]">
      <h1>Minden véleményért hálásak vagyunk!</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {reviews.map((rev, idx) => (
          <ReviewCard revData={rev}></ReviewCard>
        ))}
      </div>
    </section>
  );
}
