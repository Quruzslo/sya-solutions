"use client";

import { useState } from "react";
import {
  deleteReviewAction,
  updateReviewAction,
  createReviewAction,
} from "./actions";

export default function AdminReviewList({
  initialReviews,
}: {
  initialReviews: any[];
}) {
  // Ha null: a modal zárva van.
  // Ha van benne objektum: a modal nyitva van (szerkesztés vagy új felvétel).
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Új üres értékelés megnyitása
  const handleOpenCreateModal = () => {
    setEditingReview({
      name: "",
      content: "",
      stars: 5, // alapértelmezett 5 csillag
    });
  };

  // Törlés kezelése
  const handleDelete = async (id: string) => {
    if (confirm("Biztosan törölni szeretnéd ezt a véleményt?")) {
      setIsPending(true);
      await deleteReviewAction(id);
      setIsPending(false);
    }
  };

  // Mentés kezelése (Okos mentés: Eldönti, hogy Létrehozás vagy Módosítás)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setIsPending(true);

    if (editingReview._id) {
      // ✏️ Ha van _id -> Szerkesztés
      await updateReviewAction(editingReview._id, {
        name: editingReview.name,
        content: editingReview.content,
        stars: editingReview.stars,
      });
    } else {
      // ➕ Ha nincs _id -> Új létrehozása
      await createReviewAction({
        name: editingReview.name,
        content: editingReview.content,
        stars: editingReview.stars,
      });
    }

    setIsPending(false);
    setEditingReview(null); // Modal bezárása
  };

  return (
    <>
      {/* FEJLÉC ÉS ÚJ ÉRTÉKELÉS GOMB */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Összesen: {initialReviews.length} értékelés
        </h2>
        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition shadow-sm"
        >
          + Új értékelés hozzáadása
        </button>
      </div>

      {/* 1. KÁRTYÁK LISTÁJA */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {initialReviews.map((rev) => (
          <div
            key={rev._id}
            className="p-5 border rounded-xl bg-white shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{rev.name}</h3>
                <span className="text-amber-500 font-bold">★ {rev.stars}</span>
              </div>
              <p className="text-gray-600 text-sm">{rev.content}</p>
            </div>

            {/* Gombok */}
            <div className="flex gap-2 pt-3 border-t">
              <button
                onClick={() => setEditingReview(rev)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                Szerkesztés
              </button>
              <button
                onClick={() => handleDelete(rev._id)}
                disabled={isPending}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                Törlés
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DYNAMIC MODAL (SZERKESZTÉSHEZ ÉS LÉTREHOZÁSHOZ IS) */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              {editingReview._id
                ? "Vélemény szerkesztése"
                : "Új értékelés hozzáadása"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {/* Név input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Név
                </label>
                <input
                  type="text"
                  value={editingReview.name}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, name: e.target.value })
                  }
                  placeholder="Pl. Kovács János"
                  className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Értékelés (Stars) input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Értékelés (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.5"
                  value={editingReview.stars}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      stars: Number(e.target.value),
                    })
                  }
                  className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Tartalom textarea */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Vélemény szövege
                </label>
                <textarea
                  rows={4}
                  value={editingReview.content}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      content: e.target.value,
                    })
                  }
                  placeholder="Írd le a tapasztalatokat..."
                  className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Modal gombok */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isPending ? "Mentés..." : "Mentés"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
