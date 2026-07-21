import Link from "next/link";
import Image from "next/image";
export default function AuthorBlock({ author, post }) {
  return (
    <>
      <Link
        href="/szakmai-blog"
        className="inline-flex items-center gap-2 items-center justify-center text-feher bg-zold hover:bg-zold/50 transition-colors mb-8 font-medium p-2 rounded-md"
      >
        <span>←</span> Összes bejegyzés
      </Link>
      <div className="flex items-center flex-col gap-4 text-sm text-slate-500">
        <div className="flex flex-col items-center gap-2">
          {author?.photo ? (
            <Image
              src={author.photo}
              alt={post.author}
              width={145}
              height={145}
              className="rounded-full object-cover w-[145px] h-[145px]"
            />
          ) : (
            <div className="w-[145px] h-[145px] bg-zold/30 rounded-full flex items-center justify-center font-bold text-zold">
              {post.author.charAt(0)}
            </div>
          )}
          <span className="font-medium text-text-alap">{post.author}</span>
        </div>

        <div className="flex flex-row gap-3 items-center justify-center">
          {post.category?.name && (
            <span className="bg-zold/10 text-zold px-3 py-1 rounded-full font-semibold">
              {post.category.name}
            </span>
          )}

          <span className="text-text-alap">•</span>
          <time dateTime={post.createdAt} className="text-text-alap">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("hu-HU")
              : ""}
          </time>
        </div>
      </div>
    </>
  );
}
