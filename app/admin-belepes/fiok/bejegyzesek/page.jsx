import AdminNavComp from "../adminNavComp";
export default function BlogPage() {
  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        <div className="w-full  flex flex-col md:w-[300px]  p-[10px] items-center">
          <AdminNavComp></AdminNavComp>
        </div>
        <div className="w-full flex flex-col md:w-[100%]  p-[10px]">
          Bejegyzések
        </div>
      </div>
    </section>
  );
}
