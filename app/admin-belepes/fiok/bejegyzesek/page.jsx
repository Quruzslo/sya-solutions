import AdminNavComp from "../adminNavComp";
import Link from "next/link";
export default function BlogPage() {
  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        <div className="w-full  flex flex-col md:w-[300px]  p-[10px] items-center">
          <AdminNavComp></AdminNavComp>
        </div>
        <div className="w-full flex flex-col md:w-[100%]  p-[10px]">
          <div>
            <Link
              className="flex flex-row bg-zold/50 text-white gap-3 p-3 rounded-sm w-fit"
              href="/admin-belepes/fiok/bejegyzesek/feltoltes"
            >
              Bejegyzés hozzáadása
            </Link>
          </div>
          <div className="flex">
            <h2>Ide jönnek a bejegyzések listázva</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
