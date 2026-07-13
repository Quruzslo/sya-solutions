import AdminNavComp from "../adminNavComp";
import Link from "next/link";
import BlogPosts from "./posts";

export default async function BlogPage() {
  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        {/* Oldalsáv / Navigáció */}
        <div className="w-full flex flex-col md:w-[300px] p-[10px] items-center">
          <AdminNavComp />
        </div>

        {/* Fő tartalom */}
        <div className="w-full flex flex-col md:flex-1 p-[10px]">
          <div>
            <Link
              className="flex flex-row bg-zold/50 text-white gap-3 p-3 rounded-sm w-fit font-semibold hover:bg-zold/70 transition-colors"
              href="/admin-belepes/fiok/bejegyzesek/feltoltes"
            >
              Bejegyzés hozzáadása
            </Link>
          </div>

          {/* Listázás szekció */}
          <div className="flex flex-col mt-6">
            <h2 className="text-xl font-bold text-slate-800">
              Eddigi bejegyzések
            </h2>

            <BlogPosts />
          </div>
        </div>
      </div>
    </section>
  );
}
