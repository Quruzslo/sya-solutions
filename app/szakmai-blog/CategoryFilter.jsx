import Link from "next/link";

export default function CategoryFilter({ categories, currentCategory }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/szakmai-blog?kategoria=all&oldal=1"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentCategory === "all"
            ? "bg-zold text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        Összes
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/szakmai-blog?kategoria=${cat.slug}&oldal=1`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === cat.slug
              ? "bg-zold text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
