"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function UserActions({ user, isAdmin }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.photo || "");

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    tel: user.tel || "",
    role: user.role,
    password: "",
    photo: user.photo || "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      let finalPhotoUrl = formData.photo;

      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("photo", selectedFile);

        const uploadRes = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: imageFormData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalPhotoUrl = uploadData.url;
        } else {
          alert("Hiba történt a kép feltöltése során!");
          setLoading(false);
          return;
        }
      }

      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photo: finalPhotoUrl }),
      });

      if (res.ok) {
        setIsEditModalOpen(false);

        setSelectedFile(null);
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

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(user.photo || "");
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
        {isAdmin ? (
          <button onClick={handleDelete} disabled={isDeleting}>
            <MdDelete
              size={15}
              className={`text-red-600 cursor-pointer hover:scale-110 transition ${
                isDeleting ? "opacity-50" : ""
              }`}
              title="Törlés"
            />
          </button>
        ) : null}
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

            {/* KÉP ELŐNÉZET ÉS FELTÖLTŐ */}
            <div className="flex flex-col items-center gap-2 mb-2">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profilkép"
                  className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-200 border-2 border-slate-300 shadow-sm flex items-center justify-center text-slate-400 text-sm">
                  Nincs kép
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zold file:text-white hover:file:bg-zold/80 cursor-pointer mt-2 w-full"
              />
            </div>

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
              type="tel"
              value={formData.tel}
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
              required
              className="p-2 rounded-md border border-slate-300"
              placeholder="Telefon"
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
            {isAdmin ? (
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
            ) : null}

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={handleCloseModal}
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
