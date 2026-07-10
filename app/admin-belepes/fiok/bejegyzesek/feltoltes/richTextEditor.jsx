"use client";

import React, { useRef, useEffect, useState } from "react";

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [, forceUpdate] = useState(0);

  // A meglévő DOM-szinkronizáció
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
    document.execCommand("defaultParagraphSeparator", false, "p");
  }, [value]);

  // KÉP KATTINTÁS FIGYELŐ
  useEffect(() => {
    const handleEditorClick = (e) => {
      if (e.target.tagName === "IMG") {
        setSelectedImage(e.target);
      } else {
        setSelectedImage(null);
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("click", handleEditorClick);
    }
    return () => {
      if (editor) editor.removeEventListener("click", handleEditorClick);
    };
  }, []);

  const handleCommand = (e, command, commandValue = null) => {
    e.preventDefault();
    document.execCommand(command, false, commandValue);
    triggerChange();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        // Létrehozunk egy képet alap stílusokkal
        const imgHtml = `<img src="${upload.target.result}" class="max-w-full h-auto rounded-md inline-block transition-all" alt="Feltöltött kép" />`;
        document.execCommand("insertHTML", false, imgHtml);
        triggerChange();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerChange = () => {
    if (editorRef.current && typeof onChange === "function") {
      onChange(editorRef.current.innerHTML);
    }
  };

  const updateImgClass = (category, twClass) => {
    if (!selectedImage) return;

    const classMap = {
      width: ["w-1/4", "w-1/2", "w-full", "max-w-md"],
      round: ["rounded-none", "rounded-md", "rounded-2xl", "rounded-full"],
      float: ["float-none", "float-left", "float-right", "mx-auto", "block"],
    };

    classMap[category].forEach((cls) => selectedImage.classList.remove(cls));

    if (category === "float") {
      selectedImage.classList.remove("inline-block", "block");
      if (twClass === "mx-auto") {
        selectedImage.classList.add("block");
      } else if (twClass !== "float-none") {
        selectedImage.classList.add("inline-block", "mr-4", "ml-4");
      } else {
        selectedImage.classList.add("inline-block");
      }
    }

    if (twClass) selectedImage.classList.add(twClass);

    triggerChange();
    //Nézet frissítése, hogy ne dobjon hibát az első módosítás után
    forceUpdate((prev) => prev + 1);
  };

  const ToolbarButton = ({ onClick, children, title }) => (
    <button
      type="button"
      onMouseDown={onClick}
      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-sm font-medium"
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 relative">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-2 border-b border-slate-200 dark:border-slate-700">
        <ToolbarButton
          onClick={(e) => handleCommand(e, "bold")}
          title="Félkövér"
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton onClick={(e) => handleCommand(e, "italic")} title="Dőlt">
          <i>I</i>
        </ToolbarButton>

        <ToolbarButton
          onClick={(e) => {
            e.preventDefault();
            const selection = window.getSelection();
            let isBlockquote = false;
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const closestBlock =
                range.startContainer.parentElement?.closest(
                  "blockquote, p, div",
                );
              if (closestBlock && closestBlock.tagName === "BLOCKQUOTE") {
                isBlockquote = true;
              }
            }
            if (isBlockquote) {
              handleCommand(e, "formatBlock", "P");
            } else {
              handleCommand(e, "formatBlock", "BLOCKQUOTE");
            }
          }}
          title="Idézet ki/be"
        >
          <svg
            className="w-4 h-4 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={(e) => handleCommand(e, "removeFormat")}
          title="Formázás törlése"
        >
          Tx
        </ToolbarButton>

        <span className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></span>

        <ToolbarButton
          onClick={(e) => handleCommand(e, "insertUnorderedList")}
          title="Felsorolás"
        >
          • List
        </ToolbarButton>

        <span className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></span>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded"
        >
          + Kép beszúrása
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* LEBEGŐ KÉPFORMAZÓ PANEL */}
      {selectedImage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1">
            <span className="font-semibold text-emerald-400">
              Kép beállítások
            </span>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-slate-400 hover:text-white px-2"
            >
              ✕
            </button>
          </div>

          {/* Szélesség */}
          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Méret:</span>
            <button
              onClick={() => updateImgClass("width", "w-1/4")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("w-1/4") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              25%
            </button>
            <button
              onClick={() => updateImgClass("width", "w-1/2")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("w-1/2") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              50%
            </button>
            <button
              onClick={() => updateImgClass("width", "max-w-md")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("max-w-md") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Közepes
            </button>
            <button
              onClick={() => updateImgClass("width", "w-full")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("w-full") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              100%
            </button>
          </div>

          {/* Lekerekítés */}
          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Sarok:</span>
            <button
              onClick={() => updateImgClass("round", "rounded-none")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("rounded-none") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Szögletes
            </button>
            <button
              onClick={() => updateImgClass("round", "rounded-md")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("rounded-md") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Kicsi
            </button>
            <button
              onClick={() => updateImgClass("round", "rounded-2xl")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("rounded-2xl") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Nagy
            </button>
            <button
              onClick={() => updateImgClass("round", "rounded-full")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("rounded-full") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Kör
            </button>
          </div>

          {/* Igazítás / Float */}
          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Igazítás:</span>
            <button
              onClick={() => updateImgClass("float", "float-left")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("float-left") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Balra (körbe)
            </button>
            <button
              onClick={() => updateImgClass("float", "mx-auto")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("mx-auto") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Középre
            </button>
            <button
              onClick={() => updateImgClass("float", "float-right")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("float-right") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Jobbra (körbe)
            </button>
            <button
              onClick={() => updateImgClass("float", "float-none")}
              className={`px-2 py-1 rounded ${selectedImage.classList?.contains("float-none") || (!selectedImage.classList?.contains("float-left") && !selectedImage.classList?.contains("float-right") && !selectedImage.classList?.contains("mx-auto")) ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Alap
            </button>
          </div>
        </div>
      )}

      {/* SZERKESZTŐ TERÜLET */}
      <div
        ref={editorRef}
        contentEditable
        onInput={triggerChange}
        className="w-full min-h-[350px] p-4 text-base focus:outline-none prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-100"
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
