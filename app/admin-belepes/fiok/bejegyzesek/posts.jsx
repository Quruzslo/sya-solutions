import { client } from "@/lib/mongodb.js";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPosts() {
  let posts = [];

  try {
    const db = client.db("main").collection("posts");
    const rawPosts = await db.find({}).sort({ createdAt: -1 }).toArray();

    posts = rawPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
  } catch (error) {
    console.error("Hiba történt a bejegyzések lekérésekor:", error);
    return (
      <p className="text-red-500">Nem sikerült betölteni a bejegyzéseket.</p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-gray-400 mt-4">
        Még nincsenek feltöltött bejegyzések.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="w-full flex flex-row items-center justify-between border border-slate-200 p-4 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Kép és Szöveg bal oldalon */}
          <div className="flex flex-row items-center gap-4">
            {/* Előnézeti kép az R2-ből */}
            <div className="w-16 h-16 relative bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  Nincs kép
                </div>
              )}
            </div>

            {/* Cím és leírás */}
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-800 line-clamp-1">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {post.description}
              </p>

              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {post.category.name}
              </p>
              <div className="flex flex-col md:flex-row gap-3 bg-slate-100 py-2 px-[10px] rounded-md items-center justify-center w-fit">
                <p className="text-xs font-bold text-slate-500 line-clamp-1 mt-0.5">
                  {post.author} -
                </p>
                <span className="text-[10px] text-slate-400 mt-1">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("hu-HU")
                    : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Műveletek jobb oldalon (Szerkesztés/Törlés gombok) */}
          <div className="flex flex-row gap-2">
            <Link
              href={`/admin-belepes/fiok/bejegyzesek/modositas/${post._id}`}
              className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded transition-colors"
            >
              Szerkesztés
            </Link>
            <button
              type="button"
              className="text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded transition-colors"
            >
              Törlés
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
