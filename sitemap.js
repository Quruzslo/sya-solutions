export default function sitemap() {
  const baseUrl = "https://awww.sya-solutions.hu";

  const routes = [
    "",
    "/szemelyes-jovotervezes",
    "/csalad-tamogatas",
    "/vallalkozas-tamogatas",
    "/karrier",
    "/szakmai-blog",
    "/kapcsolat",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // + Itt később blogbejegyzések!

  return [...staticRoutes];
}
