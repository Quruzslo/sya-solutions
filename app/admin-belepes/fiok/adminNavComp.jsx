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
          className="group relative flex flex-row gap-3 cursor-pointer items-center justify-center
                     w-full p-[5px] rounded-full overflow-hidden
                     border border-zold bg-transparent
                     text-slate-700 hover:text-slate-900
                     transition-colors duration-300
                     before:content-[''] before:absolute before:inset-0
                     before:bg-zold before:translate-y-full
                     before:transition-transform before:duration-300 before:ease-out
                     hover:before:translate-y-0"
        >
          {item.icon && (
            <span
              className="relative z-10 flex items-center justify-center
                         w-8 h-8 rounded-full bg-zold text-white text-xl
                         group-hover:text-white transition-colors duration-300"
            >
              {item.icon}
            </span>
          )}
          <p className="relative z-10 font-bold">{item.name}</p>
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
}
