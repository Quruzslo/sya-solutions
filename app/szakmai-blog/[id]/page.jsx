import { client } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import AuthorBlock from "./authorBlock";

// Adatlekérő függvény cache-eléssel
const getCachedPost = unstable_cache(
  async (slugOrId) => {
    const db = client.db("main");

    let matchQuery = {};
    if (
      ObjectId.isValid(slugOrId) &&
      String(new ObjectId(slugOrId)) === slugOrId
    ) {
      matchQuery = {
        $or: [{ _id: new ObjectId(slugOrId) }, { slug: slugOrId }],
      };
    } else {
      matchQuery = { slug: slugOrId };
    }

    const rawPost = await db
      .collection("posts")
      .aggregate([
        { $match: matchQuery },
        {
          $lookup: {
            from: "posts-category",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        {
          $unwind: {
            path: "$categoryData",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $addFields: { category: "$categoryData" } },
        { $project: { categoryData: 0 } },
      ])
      .toArray();

    if (!rawPost.length) return null;

    const post = rawPost[0];
    return {
      ...post,
      _id: post._id.toString(),
      category: post.category
        ? {
            ...post.category,
            _id: post.category._id?.toString(),
          }
        : null,
    };
  },
  ["single-blog-post"],
  { revalidate: 3600, tags: ["posts"] },
);

// Dinamikus metaadatok  a SEO-hoz
export async function generateMetadata(props) {
  const params = await props.params;
  const post = await getCachedPost(params.id);

  if (!post) return { title: "Bejegyzés nem található" };

  return {
    title: `${post.title} | Pénzügyi tanácsadás`,
    description: post.description,
  };
}

export async function getAuthorData(authorName) {
  if (!authorName) return null;

  const db = client.db("main");
  const authorData = await db.collection("admin").findOne({ name: authorName });

  if (!authorData) return null;
  return {
    name: authorData.name,
    photo: authorData.photo || null,
  };
}

// Maga az oldal komponens
export default async function SingleBlogPage(props) {
  const params = await props.params;
  const post = await getCachedPost(params.id);
  const author = await getAuthorData(post.author);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-[90%] max-w-[2560px] mx-auto my-[150px]">
      <div className="flex flex-col md:flex-row gap-12 relative">
        {/* ======================= BAL OLDAL (Tartalom) ======================= */}

        <article className="flex flex-col gap-6 w-full md:w-2/3 lg:w-3/4">
          {/* Kiemelt kép */}
          <div className="relative flex flex-col w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Nincs kép
              </div>
            )}
          </div>

          {/* Cím */}
          <h1
            style={{ fontFamily: "var(--font-inter)" }}
            className="!text-[30px] font-bold text-zold leading-tight mt-4"
          >
            {post.title}
          </h1>

          {/* Leírás */}
          {post.description && (
            <p className="text-lg text-zold font-medium italic border-l-4 border-zold pl-4 py-2">
              {post.description}
            </p>
          )}

          {/* Cikk törzse */}
          <div
            className="prose prose-slate prose-lg max-w-none mt-4 prose-a:text-zold hover:prose-a:text-zold/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* ======================= JOBB OLDAL ( ======================= */}

        <aside className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-[120px] flex flex-col gap-[15px]">
            <AuthorBlock author={author} post={post} />
          </div>
        </aside>
      </div>
    </main>
  );
}
