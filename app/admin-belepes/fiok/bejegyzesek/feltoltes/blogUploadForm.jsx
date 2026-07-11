"use client";

import React, { useState } from "react";
import TextEditor from "./textEditor";
import Link from "next/link";

export default function BlogUploadForm({ session }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    content: "",
  });

  const validateForm = () => {
    let isValid = true;
    const currentErrors = { title: "", description: "", content: "" };

    if (!title.trim()) {
      currentErrors.title = "A bejegyzés címe kötelező!";
      isValid = false;
    }

    if (!description.trim()) {
      currentErrors.description = "A rövid leírás kötelező!";
      isValid = false;
    }

    if (!content.trim() || content === "<p></p>") {
      currentErrors.content = "A blogbejegyzés tartalma nem lehet üres!";
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const sendingBlogPost = async (status) => {
    if (!validateForm()) {
      console.warn("Sikertelen küldés: hiányzó kötelező mezők!");
      return;
    }

    try {
      const user = session.user;

      const blogContent = {
        userId: user.id,
        authorName: user.name,
        authorRole: user.role,
        blogTitle: title,
        blogDescription: description,
        //   blogImage: image,
        blogContent: content,
        blogStatus: status,
      };

      const response = await fetch("/api/admin/blog-upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogContent),
      });

      if (!response.ok) throw new Error(`Szerver hiba: ${response.status}`);

      const data = await response.json();
      console.log("Sikeres mentés!", data);
      alert(
        status === "published"
          ? "Bejegyzés sikeresen közzétéve!"
          : "Vázlat sikeresen elmentve!",
      );

      setErrors({ title: "", description: "", content: "" });
    } catch (err) {
      console.error("Hiba történt a küldés során:", err);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert("A kép mérete túl nagy! A megengedett maximum 5 MB.");
        e.target.value = "";
        return;
      }

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="w-[90%] my-[150px] flex flex-col mx-auto p-[10px] text-slate-800">
      {/* Fejléc címe */}
      <div className="mb-6 flex flex-col">
        <Link
          className="p-2 bg-stone-400 text-white w-fit rounded-sm mb-4"
          href="/admin-belepes/fiok/bejegyzesek"
        >
          Vissza
        </Link>

        <p className="text-[25px] font-bold tracking-tight">
          Új blogbejegyzés hozzáadása
        </p>
        <p className="text-sm text-text-alap">
          Írd meg a legújabb szakmai anyagodat.
        </p>
      </div>

      {/* Fő elrendezés */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* BAL OLDAL: A tartalom szerkesztő (Fő form) */}
        <div className="flex flex-col gap-6 w-full flex-1 min-w-0 bg-white p-6 rounded-xl shadow-sm">
          {/* 1. CÍM INPUT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Bejegyzés címe <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Pl.: Hogyan optimalizáljuk a pénzügyeinket 2026-ban..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 text-lg font-medium rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-200"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs font-medium">{errors.title}</p>
            )}
          </div>

          {/* 2. RÖVID LEÍRÁS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Rövid leírás <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Egy-két mondatos összefoglaló, ami megjelenik a főoldali blog kártyán."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-200"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-medium">
                {errors.description}
              </p>
            )}
          </div>

          {/* TipTap editor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Tartalom <span className="text-red-500">*</span>
            </label>
            <TextEditor value={content} onChange={setContent} />
            {errors.content && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.content}
              </p>
            )}
          </div>

          {/* 4. KIEMELT KÉP FELTÖLTÉS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Kiemelt kép (Opcionális)
            </label>

            <div className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 transition-all overflow-hidden bg-slate-50/50">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-slate-100 transition-colors">
                      Kép cseréje
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute right-[10px] top-[10px] bg-red-50 text-red-500 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-red-100 transition-colors"
                    >
                      Törlés
                    </button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6">
                  <svg
                    className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 transition-colors mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-600">
                    Kattints ide vagy húzd be a képet
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    WebP, PNG, JPG (Max. 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* JOBB OLDAL: Widget / Publish Box */}
        <div className="w-full xl:w-[280px] flex flex-col gap-4 xl:sticky xl:top-6 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <h3 className="font-semibold border-b border-slate-100 pb-2 text-sm text-slate-500">
              Közzététel beállításai
            </h3>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Státusz:</span>
                <span className="font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                  Vázlat
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Láthatóság:</span>
                <span className="font-semibold">Nyilvános</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => sendingBlogPost("draft")}
                className="w-full py-2 border border-slate-200 hover:bg-slate-100 font-medium text-sm rounded-lg transition-colors"
              >
                Mentés vázlatként
              </button>

              <button
                type="button"
                onClick={() => sendingBlogPost("published")}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
              >
                Közzététel most
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                if (confirm("Biztosan elveted a módosításokat?")) {
                  handleRemoveImage();
                  setTitle("");
                  setDescription("");
                  setContent("");
                  setErrors({ title: "", description: "", content: "" });
                }
              }}
              className="w-full py-2 text-red-500 hover:text-red-600 hover:bg-red-50 font-medium text-sm rounded-lg transition-colors"
            >
              Módosítások elvetése
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
