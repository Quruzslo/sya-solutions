import { client } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

// 1. Az adatlekérő függvény
export async function getRelatedPosts(categoryId, currentPostId) {
  if (!categoryId) return [];

  const db = client.db("main");

  const posts = await db
    .collection("posts")
    .find({
      category: new ObjectId(categoryId),

      _id: { $ne: new ObjectId(currentPostId) },
    })
    .limit(5)
    .sort({ createdAt: -1 })
    .toArray();

  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    category: post.category?.toString(),
  }));
}

export default async function RelatedPosts({ categoryId, currentPostId }) {
  if (!categoryId) return null;

  const relatedPosts = await getRelatedPosts(categoryId, currentPostId);

  if (!relatedPosts || relatedPosts.length === 0) {
    return (
      <div className="flex flex-col mt-8 pt-8 border-t border-zold">
        <p>Ehhez még nincs kapcsolódó bejegyzés...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 pt-8 border-t border-slate-200">
      <h3 className="text-lg font-bold text-zold mb-4">Hasonló bejegyzések</h3>

      <div className="flex flex-col gap-4">
        {relatedPosts.map((post) => (
          <Link
            href={`/szakmai-blog/${post.slug || post._id}`}
            key={post._id}
            className="group"
          >
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-slate-700 group-hover:text-zold transition-colors leading-tight">
                {post.title}
              </h4>

              {post.createdAt && (
                <span className="text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString("hu-HU")}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
