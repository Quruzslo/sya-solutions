"use client";

import React, { useState } from "react";
import TextEditor from "./textEditor";
import Link from "next/link";

export default function BlogUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

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

  const handlePublish = async (status) => {
    console.log("Mentés mint:", status, { title, description, image });
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
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* BAL OLDAL: A tartalom szerkesztő (Fő form) */}
        <div className="flex flex-col gap-6 w-full flex-1 bg-white p-6 rounded-xl shadow-sm">
          {/* 1. CÍM INPUT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Bejegyzés címe
            </label>
            <input
              type="text"
              placeholder="Pl.: Hogyan optimalizáljuk a pénzügyeinket 2026-ban..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-slate-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* 2. RÖVID LEÍRÁS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Rövid leírás
            </label>
            <textarea
              rows={3}
              placeholder="Egy-két mondatos összefoglaló, ami megjelenik a főoldali blog kártyán."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* TipTap editor */}
          <TextEditor value={content} onChange={setContent} />

          {/* 4. KIEMELT KÉP FELTÖLTÉS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Kiemelt kép (Ez lesz majd a fő kép)
            </label>

            <div className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 transition-all overflow-hidden bg-slate-50/50">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* KÖZÖS HOVER OVERLAY (Így nincs giccses dupla fekete háttér) */}
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

                    {/* JAVÍTOTT SZEMANTIKUS TÖRLÉS GOMB */}
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
                onClick={() => handlePublish("draft")}
                className="w-full py-2 border border-slate-200 hover:bg-slate-100 font-medium text-sm rounded-lg transition-colors"
              >
                Mentés vázlatként
              </button>

              <button
                type="button"
                onClick={() => handlePublish("published")}
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
                  handleRemoveImage(); // Ha elveti, itt is takarítunk!
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
