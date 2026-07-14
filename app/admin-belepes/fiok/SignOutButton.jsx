"use client";

import { signOut } from "next-auth/react";
import { RxExit } from "react-icons/rx";

export default function SignOutButton() {
  return (
    <button
      className="mt-auto cursor-pointer text-red-600 bg-stone-200 p-[5px] rounded-md flex flex-row nowrap gap-3 items-center justify-center w-full"
      onClick={() => signOut()}
    >
      <RxExit size={20} className="text-red-600" />
      Kilépés
    </button>
  );
}
