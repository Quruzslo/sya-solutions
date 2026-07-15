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
          className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
        >
          {item.icon ? (
            <span
              className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
            >
              {item.icon}
            </span>
          ) : (
            <div className="w-8 h-8 shrink-0" />
          )}

          <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
            {item.name}
          </p>

          <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
}
