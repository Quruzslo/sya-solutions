import { client } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import slugify from "@/lib/slugify.ts";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

import { Suspense } from "react";

const ITEMS_PER_PAGE = 12;

async function getCachedCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");
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
}

async function getCachedPosts(categoryId, oldal) {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");
  const db = client.db("main");
  let matchQuery = {};
  if (categoryId) matchQuery.category = new ObjectId(categoryId);
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
          $unwind: { path: "$categoryData", preserveNullAndEmptyArrays: true },
        },
        { $addFields: { category: "$categoryData" } },
        { $project: { categoryData: 0 } },
      ])
      .toArray(),
  ]);

  return {
    totalPages: Math.ceil(totalPosts / ITEMS_PER_PAGE),
    posts: rawPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      category: post.category
        ? { ...post.category, _id: post.category._id?.toString() }
        : null,
    })),
  };
}

export default async function BlogPage(props) {
  const searchParamsPromise = props.searchParams;

  return (
    <main className="w-[90%] max-w-[2560px] mx-auto my-[150px]">
      {/* Ez a rész FIX és STATIKUS, a Next.js azonnal ki tudja lőni a cache-ből */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Szakmai Blog</h1>
        <p className="text-slate-600">
          Olvasd el legújabb bejegyzéseinket és híreinket.
        </p>
      </div>

      {/* A nehéz, dinamikus részt betesszük egy Suspense boundary mögé */}
      <Suspense
        fallback={
          <p className="text-center text-slate-500 py-20">
            Bejegyzések betöltése...
          </p>
        }
      >
        <BlogContent searchParamsPromise={searchParamsPromise} />
      </Suspense>
    </main>
  );
}

async function BlogContent({ searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const oldal = Number(searchParams?.oldal) || 1;
  const currentCategory = searchParams?.kategoria
    ? decodeURIComponent(searchParams.kategoria)
    : "all";

  let posts = [];
  let categories = [];
  let totalPages = 0;

  try {
    categories = await getCachedCategories();

    let categoryId = null;
    if (currentCategory !== "all") {
      const selectedCat = categories.find((c) => c.slug === currentCategory);
      if (selectedCat) categoryId = selectedCat._id;
    }

    const data = await getCachedPosts(categoryId, oldal);
    posts = data.posts;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Hiba történt a blog adatok lekérésekor:", error);
    return (
      <p className="text-red-500 py-10 text-center">
        Hiba történt az adatok betöltésekor.
      </p>
    );
  }

  return (
    <>
      <CategoryFilter
        categories={categories}
        currentCategory={currentCategory}
      />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-10">
          Ebben a kategóriában még nincsenek bejegyzések.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={oldal}
            currentCategory={currentCategory}
          />
        </div>
      )}
    </>
  );
}
