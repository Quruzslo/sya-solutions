import { client } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import slugify from "@/lib/slugify.ts";
import { unstable_cache } from "next/cache";

const ITEMS_PER_PAGE = 12;

const getCachedCategories = unstable_cache(
  async () => {
    const db = client.db("main");
    const rawCategories = await db
      .collection("posts-category")
      .find({})
      .toArray();
    return rawCategories.map((c) => ({
      _id: c._id.toString(),
      name: c.name,
      slug: c.slug || slugify(c.name),
    }));
  },
  ["blog-categories"],
  { revalidate: 3600, tags: ["categories"] },
);

const getCachedPosts = unstable_cache(
  async (currentCategory, oldal, categories) => {
    const db = client.db("main");
    let matchQuery = {};

    if (currentCategory !== "all") {
      const selectedCat = categories.find((c) => c.slug === currentCategory);
      if (selectedCat) {
        matchQuery.category = new ObjectId(selectedCat._id);
      }
    }

    const skip = (oldal - 1) * ITEMS_PER_PAGE;

    const [totalPosts, rawPosts] = await Promise.all([
      db.collection("posts").countDocuments(matchQuery),
      db
        .collection("posts")
        .aggregate([
          { $match: matchQuery },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: ITEMS_PER_PAGE },
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
        .toArray(),
    ]);

    const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

    const posts = rawPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      category: post.category
        ? {
            ...post.category,
            _id: post.category._id?.toString(),
          }
        : null,
    }));

    return { posts, totalPages };
  },
  ["blog-posts-list"],
  { revalidate: 3600, tags: ["posts"] },
);

export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  const oldal = Number(searchParams?.oldal) || 1;
  const currentCategory = searchParams?.kategoria
    ? searchParams.kategoria
    : "all";

  let posts = [];
  let categories = [];
  let totalPages = 0;

  try {
    //  cache-elt függvények meghívása
    categories = await getCachedCategories();
    const data = await getCachedPosts(currentCategory, oldal, categories);

    posts = data.posts;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Hiba történt a blog adatok lekérésekor:", error);
    return (
      <p className="text-red-500 py-10 text-center mt-[120px]">
        Hiba történt az adatok betöltésekor.
      </p>
    );
  }

  return (
    <main className="w-[90%] max-w-[2560px] mx-auto my-[150px]">
      <div className="mb-10 text-center">
        <h1
          style={{ fontFamily: "var(--font-inter)" }}
          className="text-4xl font-bold text-slate-900 mb-4"
        >
          Szakmai Blog
        </h1>
        <p className="text-slate-600">
          Olvasd el legújabb bejegyzéseinket és híreinket.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 ">
        <div className="flex flex-col w-full md:w-[250px]">
          <CategoryFilter
            categories={categories}
            currentCategory={currentCategory}
          />
        </div>

        <div className="flex flex-col flex-1">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  w-full">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 mt-10">
              Ebben a kategóriában még nincsenek bejegyzések.
            </p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={oldal}
            currentCategory={currentCategory}
          />
        </div>
      )}
    </main>
  );
}
