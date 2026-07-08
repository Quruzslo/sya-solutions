"use client";

import { motion } from "framer-motion";
import { FiLock, FiUser } from "react-icons/fi";

export default function AdminLogin() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[var(--color-feher)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-stone-100 p-8 shadow-xl border border-stone-200/60"
      >
        {/* Kártya Fejléce */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zold text-feher shadow-md shadow-zold/20">
            <FiLock className="text-xl" />
          </div>
          <h2 className="!text-[20px] font-bold tracking-tight text-stone-800">
            Adminisztrációs felület
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Jelentkezz be a folytatáshoz.
          </p>
        </div>

        {/*  Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          {/* Felhasználónév mező */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider ml-1">
              Felhasználónév
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-stone-400 text-lg" />
              <input
                type="text"
                placeholder="admin_sya"
                className="w-full rounded-xl border border-stone-300 bg-white py-3.5 pl-12 pr-4 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-zold focus:ring-2 focus:ring-zold/20"
                required
              />
            </div>
          </div>

          {/* Jelszó mező */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider ml-1">
              Jelszó
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-stone-400 text-lg" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-300 bg-white py-3.5 pl-12 pr-4 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-zold focus:ring-2 focus:ring-zold/20"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full rounded-xl bg-zold py-3.5 font-semibold text-feher shadow-lg shadow-zold/10 transition-all hover:bg-zold/90 focus:outline-none focus:ring-2 focus:ring-zold/50 mt-2 cursor-pointer"
          >
            Belépés
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
