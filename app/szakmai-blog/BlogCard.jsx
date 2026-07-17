import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const postUrl = `/szakmai-blog/${post.slug || post._id}`;

  return (
    <Link
      href={postUrl}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Nincs kép
          </div>
        )}

        {post.category?.name && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-zold rounded-full">
            {post.category.name}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("hu-HU")
              : ""}
          </time>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-zold transition-colors">
          {post.title}
        </h3>

        <p className="text-slate-600 line-clamp-3 text-sm mb-4">
          {post.description}
        </p>

        <div className="mt-auto font-medium text-zold text-sm flex items-center gap-1">
          Tovább olvasom{" "}
          <span className="text-lg leading-none transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
