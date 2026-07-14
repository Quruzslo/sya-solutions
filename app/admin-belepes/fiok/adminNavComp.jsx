import Link from "next/link";
import navItem from "./adminNav";
import UserPanel from "./userPanel";
import SignOutButton from "./SignOutButton";

export default function AdminNavComp() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <UserPanel />

      {navItem.map((item, ind) => (
        <Link
          key={ind}
          href={item.path}
          className="flex flex-row gap-3 cursor-pointer hover:opacity-80 bg-zold/30 w-full p-[5px] items-center justify-center rounded-full shadow-[2px_2px_10px_1px_rgba(0,0,0,0)] hover:shadow-[2px_2px_10px_1px_rgba(0,0,0,0.6)] text-slate-700 hover:text-slate-900"
        >
          <p className="font-bold">{item.name}</p>
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
}
