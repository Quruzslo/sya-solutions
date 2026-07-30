import type { MetadataRoute } from "next";
import { client } from "@/lib/mongodb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sya-solutions.hu";

  //  Statikus oldalak
  const staticRoutesList = [
    "",
    "/szemelyes-jovotervezes",
    "/csalad-tamogatas",
    "/vallalkozas-tamogatas",
    "/rolunk",
    "/szakmai-blog",
    "/kapcsolat",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticRoutesList.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  //  Dinamikus blogbejegyzések lekérése ID alapján
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const postsCollection = client.db("main").collection("posts");

    const posts = await postsCollection
      .find({}, { projection: { _id: 1, updatedAt: 1 } })
      .toArray();

    blogRoutes = posts.map((blog) => ({
      url: `${baseUrl}/szakmai-blog/${blog._id.toString()}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error(
      "Hiba történt a sitemap blogbejegyzéseinek lekérésekor:",
      error,
    );
  }

  return [...staticRoutes, ...blogRoutes];
}
