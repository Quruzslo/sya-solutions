import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sya-solutions.hu";

  const routes = [
    "",
    "/szemelyes-jovotervezes",
    "/csalad-tamogatas",
    "/vallalkozas-tamogatas",
    "/rolunk",
    "/szakmai-blog",
    "/kapcsolat",
  ];

  // A MetadataRoute.Sitemap típus kényszeríti, hogy a TypeScript ne
  // sima "string"-ként, hanem "weekly" | "monthly" literálként kezelje az értékeket.
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // + Itt később blogbejegyzések!
  // const blogRoutes = ...

  return [...staticRoutes];
}
