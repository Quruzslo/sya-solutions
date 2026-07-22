import { client } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

//adatlekérő függvény
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
        <p>Nincs kapcsolódó bejegyzés...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 p-[5px] border-t border-zold">
      <h3 className="mx-auto font-bold text-zold mb-4">Kapcsolódó tartalmak</h3>

      <div className="flex flex-col gap-[15px]">
        {relatedPosts.map((post) => (
          <Link
            href={`/szakmai-blog/${post.slug || post._id}`}
            key={post._id}
            className="group"
          >
            <div className="related-post flex flex-col gap-1 p-[10px]">
              <h4 className="font-semibold !text-[20px] text-text-alap group-hover:text-feher transition-colors leading-tight z-10">
                {post.title}
              </h4>

              {post.createdAt && (
                <span className="text-xs text-slate-500 group-hover:text-slate-100 z-10">
                  {new Date(post.createdAt).toLocaleDateString("hu-HU")}
                </span>
              )}
              <p className="text-xs text-text-alap group-hover:text-feher z-10">
                {post.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
