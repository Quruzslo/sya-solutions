import { client } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

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

// Maga az oldal komponens
export default async function SingleBlogPage(props) {
  const params = await props.params;
  const post = await getCachedPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-[90%] max-w-[2560px] mx-auto my-[150px]">
      {/* Vissza gomb */}
      <Link
        href="/szakmai-blog"
        className="inline-flex items-center gap-2 text-slate-green hover:text-feher hover:bg-zold transition-colors mb-8 font-medium p-2 rounded-md"
      >
        <span>←</span> Vissza
      </Link>

      <article className="flex flex-col gap-6">
        {/* Kategória és Dátum / Szerző */}
        <div className="flex flex-col md:flex-row gap-[20px]">
          {/* Bal oldal----------- */}
          <div className="flex flex-col gap-[15px] items-start justify-center w-full md:w-1/2">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {post.category?.name && (
                <span className="bg-zold/10 text-zold px-3 py-1 rounded-full font-semibold">
                  {post.category.name}
                </span>
              )}
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.createdAt}>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("hu-HU")
                  : ""}
              </time>
            </div>

            <h1
              style={{ fontFamily: "var(--font-inter)" }}
              className=" !text-[30px]  font-bold text-slate-900 leading-tight"
            >
              {post.title}
            </h1>
          </div>

          {/*Jobb oldal , képpel*/}
          <div className="relative flex w-full md:w-1/2 aspect-video bg-slate-100 rounded-2xl overflow-hidden my-6 border border-slate-100 shadow-sm">
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
        </div>

        {/* Bevezető / Leírás */}
        {post.description && (
          <p className="text-lg text-slate-600 font-medium italic border-l-4 border-zold pl-4 py-2">
            {post.description}
          </p>
        )}

        {/* Cikk törzse */}

        <div
          className="prose prose-slate prose-lg max-w-none mt-4 prose-a:text-zold hover:prose-a:text-zold/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
