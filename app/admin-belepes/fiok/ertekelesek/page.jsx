import { client } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import AdminReviewList from "./AdminReviewList";
import AdminNavComp from "../adminNavComp";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const getCachedReviews = (userId, role) =>
  unstable_cache(
    async () => {
      const db = client.db("main").collection("reviews");

      const query = role === "admin" ? {} : { addedBy: userId };

      const reviews = await db.find(query).sort({ date: -1 }).toArray();

      return reviews.map((rev) => ({
        ...rev,
        _id: rev._id.toString(),
      }));
    },

    [`reviews-user-${role === "admin" ? "admin" : userId}`],
    {
      revalidate: 3600,
      tags: ["reviews"],
    },
  )();

export default async function AdminReviewsPage() {
  // 1. Lekérjük a bejelentkezett usert
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const role = session.user.role;

  // 2. Csak a rá tartozó értékeléseket kérjük le
  const reviews = await getCachedReviews(userId, role);

  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        {/* Oldalsáv / Navigáció */}
        <div className="w-full flex flex-col md:w-[300px] p-[10px] items-center">
          <AdminNavComp />
        </div>

        {/* Fő tartalom */}
        <div className="w-full flex flex-col p-[10px]">
          {/* Listázás szekció */}
          <div className="flex flex-col mt-6">
            <p className="!text-[20px] font-bold text-slate-800">
              Értékelések Kezelése
            </p>

            <AdminReviewList initialReviews={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}
