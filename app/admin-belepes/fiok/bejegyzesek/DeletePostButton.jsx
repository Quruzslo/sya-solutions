"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ postId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Biztosan törölni szeretnéd ezt a bejegyzést?",
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/blog-upload/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Hiba a törlés során: ${errorData.message}`);
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (err) {
      console.error("Hálózati hiba:", err);
      alert("Hálózati hiba történt a törlés során.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs w-fit font-semibold bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Törlés..." : "Törlés"}
    </button>
  );
}
