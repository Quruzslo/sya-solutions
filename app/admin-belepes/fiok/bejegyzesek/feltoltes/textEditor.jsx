"use client";

import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "max-w-full h-auto rounded-md !inline-block transition-all",
      },
    };
  },
});

export default function TextEditor({ value, onChange, onImageAdd }) {
  const fileInputRef = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, CustomImage],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none w-full min-h-[350px] p-4 focus:outline-none text-slate-800 dark:text-slate-100",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("image")) {
        setIsPanelOpen(true);
      } else {
        setIsPanelOpen(false);
      }
    },
  });

  if (!editor) return null;

  const isImageSelected = editor.isActive("image");
  const currentImgClass = editor.getAttributes("image").class || "";

  const handleCommand = (e, command) => {
    e.preventDefault();
    if (command === "bold") editor.chain().focus().toggleBold().run();
    if (command === "italic") editor.chain().focus().toggleItalic().run();
    if (command === "blockquote")
      editor.chain().focus().toggleBlockquote().run();
    if (command === "list") editor.chain().focus().toggleBulletList().run();
    if (command === "clear") editor.chain().focus().unsetAllMarks().run();
  };

  // ideiglenes blob URL generálás
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSize = 5 * 1024 * 1024; // 5 MB limit
      if (file.size > maxFileSize) {
        alert("A kép mérete túl nagy! A megengedett maximum 5 MB.");
        return;
      }

      // ideiglenes helyi linket
      const blobUrl = URL.createObjectURL(file);

      // Átadjuk a szülőnek a blob URL-t és a fizikai File objektumot is
      if (onImageAdd) {
        onImageAdd(blobUrl, file);
      }

      editor
        .chain()
        .focus()
        .setImage({ src: blobUrl, alt: file.name || "Feltöltött kép" })
        .run();
    }
  };

  const updateImgClass = (category, twClass) => {
    if (!isImageSelected) return;

    let classes = currentImgClass;
    const classMap = {
      width: ["w-1/4", "w-1/2", "w-full", "max-w-md"],
      round: ["rounded-none", "rounded-md", "rounded-2xl", "rounded-full"],
      float: [
        "!float-none",
        "!float-left",
        "!float-right",
        "!mx-auto",
        "!block",
        "!inline-block",
        "float-none",
        "float-left",
        "float-right",
        "mx-auto",
        "block",
        "inline-block",
        "mr-4",
        "ml-4",
        "mb-2",
        "mt-1",
        "my-4",
        "my-2",
      ],
    };

    classMap[category].forEach((cls) => {
      classes = classes
        .replace(new RegExp(cls.replace("!", "\\!"), "g"), "")
        .trim();
    });

    if (category === "float") {
      if (twClass === "!mx-auto") {
        classes += " !block !mx-auto my-4";
      } else if (twClass === "!float-left") {
        classes += " !inline-block !float-left mr-4 mb-2 mt-1";
      } else if (twClass === "!float-right") {
        classes += " !inline-block !float-right ml-4 mb-2 mt-1";
      } else {
        classes += " !inline-block !float-none my-2";
      }
    } else {
      if (twClass) classes += ` ${twClass}`;
    }

    editor
      .chain()
      .focus()
      .updateAttributes("image", { class: classes.replace(/\s+/g, " ").trim() })
      .run();
  };

  const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
      type="button"
      onMouseDown={onClick}
      className={`p-2 rounded transition-colors text-sm font-medium ${
        isActive
          ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div
      className="w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 relative"
      onClick={() => {
        if (editor.isActive("image")) setIsPanelOpen(true);
      }}
    >
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-2 border-b border-slate-200 dark:border-slate-700">
        <ToolbarButton
          onClick={(e) => handleCommand(e, "bold")}
          isActive={editor.isActive("bold")}
          title="Félkövér"
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton
          onClick={(e) => handleCommand(e, "italic")}
          isActive={editor.isActive("italic")}
          title="Dőlt"
        >
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton
          onClick={(e) => handleCommand(e, "blockquote")}
          isActive={editor.isActive("blockquote")}
          title="Idézet"
        >
          Idézet
        </ToolbarButton>
        <ToolbarButton
          onClick={(e) => handleCommand(e, "clear")}
          title="Formázás törlése"
        >
          Tx
        </ToolbarButton>
        <span className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></span>
        <ToolbarButton
          onClick={(e) => handleCommand(e, "list")}
          isActive={editor.isActive("bulletList")}
          title="Felsorolás"
        >
          • lista
        </ToolbarButton>
        <span className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></span>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-arany text-sm font-medium hover:bg-emerald-150 dark:hover:bg-emerald-500/10 rounded"
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

      {/* Kép állítgató panel */}
      {isImageSelected && isPanelOpen && (
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-100"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1 gap-8">
            <span className="font-semibold text-emerald-400">
              Kép beállítások
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPanelOpen(false);
              }}
              className="text-slate-400 hover:text-white font-bold transition-colors text-sm px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Méret:</span>
            {["w-1/4", "w-1/2", "max-w-md", "w-full"].map((size, i) => (
              <button
                key={size}
                type="button"
                onClick={() => updateImgClass("width", size)}
                className={`px-2 py-1 rounded ${currentImgClass.includes(size) ? "bg-emerald-600" : "bg-slate-700"}`}
              >
                {["25%", "50%", "Közepes", "100%"][i]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Sarok:</span>
            {["rounded-none", "rounded-md", "rounded-2xl", "rounded-full"].map(
              (round, i) => (
                <button
                  key={round}
                  type="button"
                  onClick={() => updateImgClass("round", round)}
                  className={`px-2 py-1 rounded ${currentImgClass.includes(round) ? "bg-emerald-600" : "bg-slate-700"}`}
                >
                  {["Szögletes", "Kicsi", "Nagy", "Kör"][i]}
                </button>
              ),
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="w-14 text-slate-400">Igazítás:</span>
            <button
              type="button"
              onClick={() => updateImgClass("float", "!float-left")}
              className={`px-2 py-1 rounded ${currentImgClass.includes("!float-left") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Balra
            </button>
            <button
              type="button"
              onClick={() => updateImgClass("float", "!mx-auto")}
              className={`px-2 py-1 rounded ${currentImgClass.includes("!mx-auto") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Középre
            </button>
            <button
              type="button"
              onClick={() => updateImgClass("float", "!float-right")}
              className={`px-2 py-1 rounded ${currentImgClass.includes("!float-right") ? "bg-emerald-600" : "bg-slate-700"}`}
            >
              Jobbra
            </button>
          </div>
        </div>
      )}

      {/* SZERKESZTŐ TERÜLET */}
      <EditorContent editor={editor} />
    </div>
  );
}
