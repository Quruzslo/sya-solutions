import { client } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ReviewCard from "./ReviewCard";

const getCachedReviews = unstable_cache(
  async () => {
    const db = client.db("main").collection("reviews");
    const reviews = await db.find({}).sort({ date: -1 }).toArray();

    return reviews.map((rev) => ({
      ...rev,
      _id: rev._id.toString(),
      date: rev.date ? rev.date.toString() : null,
    }));
  },
  ["reviews"],
  {
    revalidate: 3600,
    tags: ["reviews"],
  },
);

export default async function Reviews() {
  const reviews = await getCachedReviews();

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[120px]">
      <h1 className="text-3xl font-bold mb-8">
        Minden véleményért hálásak vagyunk!
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <ReviewCard key={rev._id} revData={rev} />
        ))}
      </div>
    </section>
  );
}
