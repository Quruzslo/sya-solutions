import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AdminNavComp from "./adminNavComp";
import UserPanel from "./userPanel";

export default async function FiokPage() {
  const session = await auth();
  if (
    !session ||
    (session.user?.role !== "admin" && session.user?.role !== "editor")
  ) {
    redirect("/admin-belepes");
  }
  const isAdmin = user.role === "admin";

  return (
    <section className="w-full min-h-screen flex flex-col pt-[120px]">
      <div className="w-full flex-1 flex flex-col md:flex-row">
        <div className="w-full  flex flex-col md:w-[300px]  p-[10px] items-center">
          <AdminNavComp></AdminNavComp>
          <UserActions
            user={{
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            }}
            isAdmin={isAdmin}
          />
        </div>
        <div className="w-full flex flex-col md:w-[100%]  p-[10px]">
          Grafikonok és minden más
        </div>
      </div>
    </section>
  );
}
