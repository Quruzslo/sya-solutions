import { client } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import AdminReviewList from "./AdminReviewList";

const getCachedReviews = unstable_cache(
  async () => {
    const db = client.db("main").collection("reviews");
    const reviews = await db.find({}).sort({ date: -1 }).toArray();

    return reviews.map((rev) => ({
      ...rev,
      _id: rev._id.toString(),
    }));
  },
  ["reviews"],
  {
    revalidate: 3600,
    tags: ["reviews"],
  },
);

export default async function AdminReviewsPage() {
  const reviews = await getCachedReviews();

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[120px]">
      <h1 className="text-3xl font-bold mb-8"> Értékelések Kezelése</h1>
      <AdminReviewList initialReviews={reviews} />
    </section>
  );
}
