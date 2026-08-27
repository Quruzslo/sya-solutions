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
      className="group overflow-hidden relative flex flex-col p-[10px] duration-300 scale-100 hover:scale-100 transition-all duration-300 ease-out hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.6)] rounded-xl"
      aria-label={post.title}
    >
      <div className=" inset-0 absolute bg-black/20 rounded-xl z-2"></div>
      <div className="absolute inset-0 w-full  rounded-xl overflow-hidden ">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover scale-100 transition-all duration-500 ease-out motion-reduce:transition-none  group-hover:scale-[1.15]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-slate-200 m-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            Nincs kép
          </div>
        )}
      </div>

      <div className="flex flex-row gap-[15px] z-10 mb-[100px] w-fit backdrop-blur-sm rounded-full py-[5px] pl-[5px] pr-[25px] bg-black/20 items-center justify-center">
        <div className="flex w-[40px] h-[40px] rounded-full">
          {post.authorPhoto ? (
            <Image
              height={40}
              width={40}
              src={post.authorPhoto}
              alt={post.author}
              className="object-cover rounded-full ratio-1:1"
            ></Image>
          ) : (
            <p className="w-[40px] h-[40px]  rounded-full text-white bg-zold flex flex-row items-center justify-center">
              {post.author.slice(0, 1)}
            </p>
          )}
        </div>

        <div className=" flex flex-col items-start gap-[5px] text-[12px] text-white ">
          <span className="truncate">{post.author}</span>
          {formattedDate && (
            <>
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-2 z-10">
        {post.category?.name && (
          <span className=" w-fit items-center gap-2 text-[12px] text-white bg-black/20 backdrop-blur-sm p-1 rounded-full px-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-zold" />
            {post.category.name}
          </span>
        )}

        <h3 className="!text-[20px] font-bold leading-snug text-white line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-gray-100 line-clamp-3 mt-1 truncate ">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
