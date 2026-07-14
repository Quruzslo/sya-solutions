import Image from "next/image";

export default function UserPanel({ session }) {
  if (!session || !session.user) return null;

  const { name, role, profilePicture, profilePic, image } = session.user;

  const imgUrl = profilePicture || profilePic || image;

  return (
    <div className="flex items-center gap-3 p-3  border border-slate-200 rounded-lg w-full mb-[25px]">
      {imgUrl ? (
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
          <Image
            src={imgUrl}
            alt={`${name || "Felhasználó"} profilképe`}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-zold/10  flex items-center justify-center flex-shrink-0 border border-zold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-feher"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Név és Szerepkör */}
      <div className="flex flex-col pr-2">
        <span className="text-sm font-bold text-slate-800 line-clamp-1">
          {name || "Ismeretlen Felhasználó"}
        </span>
        <span className="text-xs font-medium text-emerald-600 capitalize">
          {role || "felhasználó"}
        </span>
      </div>
    </div>
  );
}
