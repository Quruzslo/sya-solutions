import Link from "next/link";
import navItem from "./adminNav";
import UserPanel from "./userPanel";
import SignOutButton from "./SignOutButton";

export default function AdminNavComp() {
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <UserPanel />

      {navItem.map((item, ind) => (
        <Link
          key={ind}
          href={item.path}
          className="flex flex-row gap-3 cursor-pointer hover:opacity-80 bg-zold/10 w-full p-[5px] items-center justify-center rounded-full shadow-[5px_9px_5px_5px_rgba(0,0,0,0.1)] hover:shadow-[5px_9px_5px_5px_rgba(0,0,0,0.6)] text-slate-700 hover:text-slate-900"
        >
          <p>{item.name}</p>
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
}
