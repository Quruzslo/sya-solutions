import AdminNavComp from "../adminNavComp";
import AddUserForm from "./AddUserForm";
import client from "@/lib/mongodb";

export default async function UsersPage() {
  // 1. JAVÍTÁS: Await a toArray() előtt
  const db = client.db("main").collection("admin");
  const users = await db.find({}).toArray();

  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        <div className="w-full flex flex-col md:w-[300px] p-[10px] items-center">
          <AdminNavComp />
        </div>

        {/* Fő tartalom */}
        <div className="w-full flex flex-col p-[10px]">
          <div className="flex flex-row items-center justify-center bg-zold/50 text-white gap-3 p-3 rounded-sm w-fit font-semibold hover:bg-zold/70 transition-colors">
            <div>
              <input
                type="checkbox"
                id="toggle-user-form"
                className="peer hidden"
              />

              <label
                htmlFor="toggle-user-form"
                className="inline-block bg-transparent text-white px-4 py-2 rounded cursor-pointer select-none hover:bg-feher hover:text-zold transition"
              >
                Felhasználó hozzáadása
              </label>

              <div className="grid transition-all duration-300 ease-in-out w-full grid-rows-[0fr] opacity-0 peer-checked:grid-rows-[1fr] peer-checked:opacity-100">
                <div className="overflow-hidden">
                  <AddUserForm />
                </div>
              </div>
            </div>
          </div>

          {/* Listázás szekció */}
          <div className="flex flex-col mt-6">
            <p className="!text-[20px] font-bold text-slate-800 mb-4">
              Felhasználók listája
            </p>
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <div
                  key={user._id.toString()}
                  className="flex flex-col bg-white p-4 rounded-md shadow-sm border border-slate-200"
                >
                  <p>
                    <span className="font-semibold">Név:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>

                  <p>
                    <span className="font-semibold">Létrehozva:</span>{" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("hu-HU")
                      : "Nincs adat"}
                  </p>

                  <p>
                    <span className="font-semibold">Jogosultság:</span>{" "}
                    {user.role === "editor" ? "Szerkesztő" : "Admin"}
                  </p>
                </div>
              ))}

              {users.length === 0 && (
                <p className="text-slate-500">Még nincsenek felhasználók.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
