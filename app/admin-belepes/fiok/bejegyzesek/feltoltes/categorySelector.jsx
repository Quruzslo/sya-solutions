"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
  error,
}) {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Állapotok az új hozzáadásához
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Állapotok a szerkesztéshez
  const [editingId, setEditingId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const dropdownRef = useRef(null);

  // Kategóriák lekérése induláskor
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blog-upload/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Hiba a kategóriák betöltésekor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Kattintás a dropdownon kívül -> bezárás
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsAdding(false);
        setEditingId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Új kategória mentése
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch("/api/admin/blog-upload/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (res.ok) {
        const data = await res.json();
        await fetchCategories();
        setSelectedCategory(data.category._id);
        setNewCategoryName("");
        setIsAdding(false);
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a létrehozáskor.");
    }
  };

  // Kategória módosítása
  const handleEditCategory = async (id) => {
    if (!editCategoryName.trim()) return;
    try {
      const res = await fetch(`/api/admin/blog-upload/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCategoryName }),
      });
      if (res.ok) {
        await fetchCategories();
        setEditingId(null);
        setEditCategoryName("");
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a módosításkor.");
    }
  };

  // Kategória törlése
  const handleDeleteCategory = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Biztosan törlöd ezt a kategóriát?")) return;

    try {
      const res = await fetch(`/api/admin/blog-upload/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedCategory === id) {
          setSelectedCategory("");
        }
        await fetchCategories();
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a törléskor.");
    }
  };

  const selectedCategoryObj = categories.find(
    (c) => c._id === selectedCategory,
  );

  return (
    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
      <label className="text-sm font-semibold text-slate-500">
        Kategória <span className="text-red-500">*</span>
      </label>

      {/* Kiválasztó gomb */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-sm bg-white border cursor-pointer rounded-lg transition-all ${
          error
            ? "border-red-500"
            : isOpen
              ? "border-emerald-500 ring-2 ring-emerald-100"
              : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span
          className={
            selectedCategoryObj
              ? "text-slate-800 font-medium"
              : "text-slate-400"
          }
        >
          {loading
            ? "Betöltés..."
            : selectedCategoryObj
              ? selectedCategoryObj.name
              : "Válassz kategóriát..."}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

      {/* Lenyíló menü */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
          <div className="max-h-60 overflow-y-auto p-1">
            {categories.length === 0 && !loading && (
              <p className="p-3 text-xs text-slate-400 text-center">
                Nincs még kategória.
              </p>
            )}

            {categories.map((category) => (
              <div
                key={category._id}
                className="group flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-md"
              >
                {/* Ha épp ezt szerkesztjük */}
                {editingId === category._id ? (
                  <div className="flex items-center w-full gap-2">
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-emerald-500 rounded focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditCategory(category._id)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Normál listaelem */
                  <>
                    <div
                      className="flex-1 cursor-pointer text-sm text-slate-700 py-1 px-1 font-medium"
                      onClick={() => {
                        setSelectedCategory(category._id);
                        setIsOpen(false);
                      }}
                    >
                      {category.name}
                    </div>
                    {/* Akció ikonok (Hoverre jelennek meg) */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(category._id);
                          setEditCategoryName(category.name);
                          setIsAdding(false);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                        title="Szerkesztés"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDeleteCategory(category._id, e)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Törlés"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Új kategória hozzáadása sáv */}
          <div className="border-t border-slate-100 p-2 bg-slate-50">
            {isAdding ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Új kategória neve..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-emerald-500 focus:outline-none"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 bg-emerald-600 text-white text-xs py-1.5 rounded font-medium hover:bg-emerald-700"
                  >
                    Mentés
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="flex-1 bg-slate-200 text-slate-700 text-xs py-1.5 rounded font-medium hover:bg-slate-300"
                  >
                    Mégse
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="flex items-center justify-center gap-1 w-full py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Új kategória
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
