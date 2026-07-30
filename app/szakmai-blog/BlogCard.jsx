"use client";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const postUrl = `/szakmai-blog/${post.slug || post._id}`;
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("hu-HU")
    : "";

  return (
    <Link
      href={postUrl}
      className="group overflow-hidden relative flex flex-col bg-white   duration-300 scale-100 hover:scale-95 transition-all duration-300 ease-out"
      aria-label={post.title}
    >
      {/* felső accent  */}
      <div className="relative h-[5px] w-full bg-transparent overflow-hidden">
        <div
          className="absolute rounded-md
         inset-0 origin-left scale-x-0 bg-zold transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-x-100"
        />
      </div>

      <div className="relative w-full aspect-[4/3]  overflow-hidden">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover  scale-100 transition-all duration-500 ease-out motion-reduce:transition-none  group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-slate-200 m-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            Nincs kép
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col gap-2 p-6">
        {post.category?.name && (
          <span className="inline-flex w-fit items-center gap-1.5  text-[12px] uppercase tracking-wider text-zold">
            <span className="h-1.5 w-1.5 rounded-full bg-zold" />
            {post.category.name}
          </span>
        )}

        <h3 className="text-xl font-bold leading-snug text-slate-900 line-clamp-2">
          {post.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-zold">
          <span>{post.author}</span>
          {formattedDate && (
            <>
              <span className="text-zold">/</span>
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </>
          )}
        </div>

        <p className="text-sm text-text-alap line-clamp-3 mt-1">
          {post.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-slate-900">
          <span className="relative">
            Tovább olvasom
            <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-zold transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-x-100" />
          </span>

          <span
            aria-hidden="true"
            className="overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 shrink-0 -translate-x-2 text-zold transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-0"
            >
              <path
                d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
