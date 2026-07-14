"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import navItem from "./adminNav";
import { RxExit } from "react-icons/rx";
import UserPanel from "./userPanel";

export default function AdminNavComp({ session }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <UserPanel session={session}></UserPanel>
      {navItem.map((item, ind) => (
        <div
          key={ind}
          onClick={() => router.push(item.path)}
          className="flex flex-row gap-3 cursor-pointer hover:opacity-80 bg-zold/10 w-full p-[5px] items-center justify-center rounded-md"
        >
          <p>{item.name}</p>
        </div>
      ))}
      <button
        className="mt-auto cursor-pointer bg-stone-200 p-[5px] rounded-md flex flex-row nowrap gap-3 items-center justify-center"
        onClick={() => {
          signOut();
        }}
      >
        <RxExit size={20} className="text-red-600" />
        Kilépés
      </button>
    </div>
  );
}
