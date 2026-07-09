"use client";

import { motion } from "framer-motion";
import { FiLock, FiUser } from "react-icons/fi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [formState, setFormState] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (typeof window === "undefined" || !window.grecaptcha) {
        setError("A biztonsági ellenőrzés még tölt, kérjük próbáld újra!");
        setLoading(false);
        return;
      }

      const recaptchaToken = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: "admin_login" })
            .then((token) => resolve(token))
            .catch((err) => reject(err));
        });
      });

      const result = await signIn("credentials", {
        email: formState.userName,
        password: formState.password,
        recaptchaToken: recaptchaToken,
        redirect: false,
      });

      if (result?.error) {
        setError("Hibás felhasználónév vagy jelszó!");
        setLoading(false);
      } else {
        router.push("/admin-belepes/fiok");
        router.refresh();
      }
    } catch (err) {
      console.error("reCAPTCHA vagy Login hiba:", err);
      setError("Váratlan hiba történt a biztonsági ellenőrzés során.");
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />

      <section className="flex min-h-screen w-full items-center justify-center bg-[var(--color-feher)] px-4 py-[35px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-stone-200/60"
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

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogIn} className="flex flex-col gap-5">
            {/* Felhasználónév mező */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider ml-1">
                Felhasználónév (Email)
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-4 text-stone-400 text-lg" />
                <input
                  type="text"
                  name="userName"
                  value={formState.userName}
                  placeholder="admin@sya.hu"
                  onChange={handleChange}
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
                  name="password"
                  value={formState.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-stone-300 bg-white py-3.5 pl-12 pr-4 text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-zold focus:ring-2 focus:ring-zold/20"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3.5 font-semibold text-feher shadow-lg transition-all mt-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zold/50 
                ${loading ? "bg-stone-400 cursor-not-allowed shadow-none" : "bg-zold hover:bg-zold/90 shadow-zold/10"}`}
            >
              {loading ? "Belépés folyamatban..." : "Belépés"}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </>
  );
}
