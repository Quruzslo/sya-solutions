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
      <h1 className=" font-bold mb-8 bg-zold/50 text-feher p-[10px] w-full text-center rounded-xl !text-[20px] md:!text-[35px]">
        Minden véleményért hálásak vagyunk!
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-[50px]">
        {reviews.map((rev) => (
          <ReviewCard key={rev._id} revData={rev} />
        ))}
      </div>
    </section>
  );
}
