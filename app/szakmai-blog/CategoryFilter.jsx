import Link from "next/link";

export default function CategoryFilter({ categories, currentCategory }) {
  const items = [
    {
      key: "all",
      href: "/szakmai-blog?kategoria=all&oldal=1",
      label: "Összes",
    },
    ...categories.map((cat) => ({
      key: cat.slug,
      href: `/szakmai-blog?kategoria=${cat.slug}&oldal=1`,
      label: cat.name,
    })),
  ];

  return (
    <nav
      aria-label="Kategória szűrő"
      className="flex flex-col items-start gap-2 border-2 border-zold rounded-[10px] relative p-[5px] pb-[20px]"
    >
      <div className="border-2 border-zold rounded-full p-[5px] mx-auto translate-y-[calc(-65%)] bg-feher">
        <h3>Kategória szűrő</h3>
      </div>
      {items.map((item) => {
        const isActive = currentCategory === item.key;

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`group flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zold/40 focus-visible:ring-offset-2 ${
              isActive
                ? "border-zold bg-zold text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-zold/40 hover:bg-zold/5 hover:text-zold"
            }`}
          >
            <span className="whitespace-nowrap">{item.label}</span>

            <span
              aria-hidden="true"
              className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
                isActive
                  ? "ml-2 w-4 opacity-100"
                  : "ml-0 w-0 opacity-0 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  isActive
                    ? "translate-x-0"
                    : "-translate-x-2 group-hover:translate-x-0"
                }`}
              >
                <path
                  d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
