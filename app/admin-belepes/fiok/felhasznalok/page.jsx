import AdminNavComp from "../adminNavComp";
import AddUserForm from "./AddUserForm";
import { client } from "@/lib/mongodb";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default async function UsersPage() {
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
            <div className="w-full md:w-fit flex flex-col">
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
          <div className="flex flex-col mt-10">
            <div className="flex items-baseline justify-between mb-5">
              <p className="text-[20px] font-bold text-slate-800">
                Felhasználók listája
              </p>
              <span className="font-mono text-xs text-feher bg-zold p-2 rounded-sm w-fit">
                {users.length}{" "}
                {users.length === 1 ? "felhasználó" : "felhasználó"}
              </span>
            </div>

            <div className="flex flex-col divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              {users.map((user) => {
                const initials = user.name
                  ? user.name
                      .trim()
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "?";

                return (
                  <div
                    key={user._id.toString()}
                    className="flex items-center gap-4 p-4 hover:bg-zold/5 transition-colors duration-200"
                  >
                    {/* Avatar */}
                    <div className="shrink-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-zold/10 border border-zold/30 flex items-center justify-center">
                          <span className="font-mono text-sm font-semibold text-zold">
                            {initials}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Név + email+ jog */}
                    <div className="flex flex-col min-w-0 flex-1 gap-3">
                      <p className="font-semibold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {user.email}
                      </p>
                      <span
                        className={`shrink-0 font-mono text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full border ${
                          user.role === "editor"
                            ? "border-slate-300 text-slate-500"
                            : "border-zold/40 bg-zold/10 text-zold"
                        }`}
                      >
                        {user.role === "editor" ? "Szerkesztő" : "Admin"}
                      </span>
                    </div>

                    {/* Létrehozva */}
                    <span className="flex flex-col gap-2 shrink-0 font-mono text-xs text-slate-400 w-fit text-right">
                      <span>Létrehozva:</span>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("hu-HU")
                        : "—"}
                    </span>
                    <div className="flex flex-row gap-4">
                      <FaPen size={15} className="text-zold" />
                      <MdDelete size={15} className="text-red-600" />
                    </div>
                  </div>
                );
              })}

              {users.length === 0 && (
                <p className="text-slate-500 p-6 text-center text-sm">
                  Még nincsenek felhasználók.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
