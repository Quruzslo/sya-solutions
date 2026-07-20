"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
    role: "editor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/users/insert-new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.message, type: "success" });

        setFormData({
          name: "",
          email: "",
          tel: "",
          password: "",
          role: "editor",
        });
        router.refresh();
      } else {
        setMessage({
          text: data.message || "Hiba történt a mentés során!",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Hálózati hiba történt!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-4 p-4 mt-4 bg-white/10 rounded-md border border-white/20 w-full md:w-[400px] text-slate-800 w-full"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-white" htmlFor="name">
          Név
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 rounded-md bg-white border-none outline-none focus:ring-2 focus:ring-zold"
          placeholder="Kovács János"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-white" htmlFor="email">
          Email cím
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 rounded-md bg-white border-none outline-none focus:ring-2 focus:ring-zold"
          placeholder="janos@email.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-white" htmlFor="email">
          Telefonszám
        </label>
        <input
          type="tel"
          id="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          required
          className="p-2 rounded-md bg-white border-none outline-none focus:ring-2 focus:ring-zold"
          placeholder="+36201233223"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-white" htmlFor="password">
          Jelszó
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="p-2 rounded-md bg-white border-none outline-none focus:ring-2 focus:ring-zold"
          placeholder="••••••••"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-white" htmlFor="role">
          Szerepkör
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 rounded-md bg-white border-none outline-none focus:ring-2 focus:ring-zold cursor-pointer"
        >
          <option value="editor">Szerkesztő (Editor)</option>
          <option value="admin">Adminisztrátor</option>
        </select>
      </div>

      {message.text && (
        <div
          className={`p-2 text-sm rounded-md font-semibold ${
            message.type === "success"
              ? "bg-green-500/20 text-green-200"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 p-2 bg-zold text-white rounded-md font-bold hover:bg-zold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Hozzáadás folyamatban..." : "Létrehozás"}
      </button>
    </form>
  );
}
