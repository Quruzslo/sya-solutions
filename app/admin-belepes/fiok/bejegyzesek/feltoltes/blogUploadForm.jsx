"use client";

import React, { useState, useEffect } from "react";
import TextEditor from "./textEditor";
import Link from "next/link";
import CategorySelector from "./categorySelector";
import { useRouter } from "next/navigation";

export default function BlogUploadForm({ session, postId = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!postId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pendingImages, setPendingImages] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  const isEditMode = !!postId;

  // 1. Adatok betöltése Módosítás módban
  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/admin/blog-upload/${postId}`);
        if (!res.ok) throw new Error("Nem sikerült lekérni a poszt adatait!");

        const data = await res.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
        setContent(data.content || "");
        setSelectedCategory(data.category || "");
        setImagePreview(data.imageUrl || null);
      } catch (err) {
        console.error("Hiba a poszt betöltésekor:", err);
        alert("Nem sikerült betölteni a bejegyzést!");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleEditorImageAdd = (blobUrl, file) => {
    setPendingImages((prev) => ({
      ...prev,
      [blobUrl]: file,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const currentErrors = {
      title: "",
      description: "",
      content: "",
      category: "",
    };

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

    if (!selectedCategory) {
      currentErrors.category = "A kategória kiválasztása kötelező!";
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

    const uploadedBlobs = [];

    try {
      // 2. Képkezelés logikája
      let finalImageUrl = imagePreview;

      if (image) {
        // Ha van új fájl kiválasztva, feltöltjük azt
        const imageFormData = new FormData();
        imageFormData.append("file", image);

        const uploadRes = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadRes.ok) throw new Error("Hiba a kép feltöltése során");

        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      // 3. Inline szerkesztő képek feltöltése
      let finalContent = content;

      if (content.includes("blob:")) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const embeddedImages = doc.querySelectorAll("img");

        for (const img of embeddedImages) {
          const src = img.getAttribute("src");

          if (src && src.startsWith("blob:")) {
            const fileObj = pendingImages[src];

            if (fileObj) {
              const inlineImageFormData = new FormData();
              inlineImageFormData.append("file", fileObj);

              const inlineUploadRes = await fetch("/api/admin/upload-image", {
                method: "POST",
                body: inlineImageFormData,
              });

              if (!inlineUploadRes.ok) {
                throw new Error(
                  "Hiba a szerkesztő egyik képének feltöltésekor",
                );
              }

              const inlineUploadData = await inlineUploadRes.json();
              img.setAttribute("src", inlineUploadData.url);
              uploadedBlobs.push(src);
            }
          }
        }

        finalContent = doc.body.innerHTML;
      }

      // 4. Payload összeállítása
      const user = session.user;
      const blogContent = {
        userId: user.id,
        authorName: user.name,
        authorRole: user.role,
        blogTitle: title,
        blogDescription: description,
        blogImage: finalImageUrl,
        blogContent: finalContent,
        blogStatus: status,
        categoryId: selectedCategory,
      };

      // Dinamikus API URL és Metódus kiválasztása
      const apiUrl = isEditMode
        ? `/api/admin/blog-upload/${postId}`
        : "/api/admin/blog-upload";
      const apiMethod = isEditMode ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method: apiMethod,
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
        isEditMode
          ? "Bejegyzés sikeresen frissítve!"
          : status === "published"
            ? "Bejegyzés sikeresen közzétéve!"
            : "Vázlat elmentve!",
      );

      // Blob URL-ek felszabadítása
      uploadedBlobs.forEach((blobUrl) => {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (e) {
          console.error(
            "Nem sikerült felszabadítani a blob URL-t:",
            blobUrl,
            e,
          );
        }
      });

      if (isEditMode) {
        router.push("/admin-belepes/fiok/bejegyzesek");
      } else {
        setErrors({ title: "", description: "", content: "", category: "" });
        setTitle("");
        setDescription("");
        setContent("");
        setSelectedCategory("");
        setPendingImages({});
        handleRemoveImage();
      }
    } catch (err) {
      console.error("Hiba történt a küldés során:", err);
      alert("Hiba történt a mentés során. Próbáld újra!");
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

      // Csak akkor szabadítjuk fel a régit, ha az blob URL volt
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold animate-pulse text-slate-600">
          Bejegyzés adatainak betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] my-[150px] flex flex-col mx-auto p-[10px] text-slate-800">
      <div className="mb-6 flex flex-col">
        <Link
          className="p-2 bg-stone-400 text-white w-fit rounded-sm mb-4"
          href="/admin-belepes/fiok/bejegyzesek"
        >
          Vissza
        </Link>
        <p className="text-[25px] font-bold tracking-tight">
          {isEditMode
            ? "Blogbejegyzés módosítása"
            : "Új blogbejegyzés hozzáadása"}
        </p>
        <p className="text-sm text-text-alap">
          {isEditMode
            ? "Szerkeszd a már közzétett szakmai anyagodat."
            : "Írd meg a legújabb szakmai anyagodat."}
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        <div className="flex flex-col gap-6 w-full flex-1 min-w-0 bg-white p-6 rounded-xl shadow-sm">
          {/* Cím */}
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

          {/* Leírás */}
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

          {/* Tartalom (Tiptap TextEditor) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-alap">
              Tartalom <span className="text-red-500">*</span>
            </label>
            <TextEditor
              value={content}
              onChange={setContent}
              onImageAdd={handleEditorImageAdd}
            />
            {errors.content && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.content}
              </p>
            )}
          </div>

          {/* Képfeltöltés */}
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

        {/* JOBB OLDAL (Beállítások) */}
        <div className="w-full xl:w-[280px] flex flex-col gap-4 xl:sticky xl:top-6 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <h3 className="font-semibold border-b border-slate-100 pb-2 text-sm text-slate-500">
              Közzététel beállításai
            </h3>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Típus:</span>
                <span className="font-semibold text-emerald-600">
                  {isEditMode ? "Módosítás" : "Új poszt"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Láthatóság:</span>
                <span className="font-semibold">Nyilvános</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              error={errors.category}
            />

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
                {isEditMode ? "Módosítások mentése" : "Közzététel most"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                if (confirm("Biztosan elveted a módosításokat?")) {
                  if (isEditMode) {
                    router.push("/admin-belepes/fiok/bejegyzesek");
                  } else {
                    handleRemoveImage();
                    setTitle("");
                    setDescription("");
                    setContent("");
                    setSelectedCategory("");
                    setPendingImages({});
                    setErrors({
                      title: "",
                      description: "",
                      content: "",
                      category: "",
                    });
                  }
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
