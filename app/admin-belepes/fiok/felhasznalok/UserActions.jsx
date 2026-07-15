"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function UserActions({ user, isAdmin }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
  });

  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (
      !confirm(
        `Biztosan törölni szeretnéd a(z) ${user.name} nevű felhasználót?`,
      )
    )
      return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Hiba történt a törlés során!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || "Hiba a mentés során!");
      }
    } catch (error) {
      console.error(error);
      alert("Hálózati hiba!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <button onClick={() => setIsEditModalOpen(true)} disabled={isDeleting}>
          <FaPen
            size={15}
            className="text-zold cursor-pointer hover:scale-110 transition"
            title="Szerkesztés"
          />
        </button>
        <button onClick={handleDelete} disabled={isDeleting}>
          <MdDelete
            size={15}
            className={`text-red-600 cursor-pointer hover:scale-110 transition ${isDeleting ? "opacity-50" : ""}`}
            title="Törlés"
          />
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/30 text-zold z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-feher p-6 rounded-lg w-full max-w-md flex flex-col gap-4 shadow-xl"
          >
            <p className="text-zold text-xl font-bold mb-2">
              Felhasználó szerkesztése
            </p>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="p-2 rounded-md border border-slate-300"
              placeholder="Név"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="p-2 rounded-md border border-slate-300"
              placeholder="Email"
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-2 rounded-md border border-slate-300"
              placeholder="Új jelszó (hagyd üresen, ha nem változik)"
            />

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="p-2 rounded-md border border-slate-300"
            >
              <option value="editor">Szerkesztő</option>
              <option value="admin">Adminisztrátor</option>
            </select>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-slate-400 text-white rounded-md hover:bg-slate-500 transition-colors"
              >
                Mégse
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-zold text-white rounded-md hover:bg-zold/80 transition-colors disabled:opacity-50"
              >
                {loading ? "Mentés..." : "Mentés"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
