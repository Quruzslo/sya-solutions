import AdminNavComp from "../adminNavComp";
import AddUserForm from "./AddUserForm";

export default async function UsersPage() {
  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        {/* Oldalsáv / Navigáció */}
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

              {/* A gomb vagy címke, amire kattintva vált a checkbox */}
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
            <p className="!text-[20px] font-bold text-slate-800">
              Felhasználók listája
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
