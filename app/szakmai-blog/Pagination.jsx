import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  currentCategory,
}) {
  const getPageUrl = (pageNumber) => {
    return `/szakmai-blog?kategoria=${currentCategory}&oldal=${pageNumber}`;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Előző gomb */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
        >
          Előző
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-slate-100 rounded-md text-slate-300 cursor-not-allowed text-sm font-medium"
        >
          Előző
        </button>
      )}

      {/* Oldalszámok */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-zold text-white"
              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Következő gomb */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
        >
          Következő
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-slate-100 rounded-md text-slate-300 cursor-not-allowed text-sm font-medium"
        >
          Következő
        </button>
      )}
    </div>
  );
}
