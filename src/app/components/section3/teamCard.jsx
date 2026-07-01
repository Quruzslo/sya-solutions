import Image from 'next/image'

export default function TeamCard({ title, name, desc, num, image, setActiveMember, isActive }) {
  const settingMember = () => {
    setActiveMember({
      image: image,
      title: title,
      name: name,
      desc: desc,
      isActive: num,
    })
  }

  return (
    <div
      onMouseEnter={settingMember}

      className="flex flex-col gap-3 w-full h-full relative overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="w-full h-full absolute top-0 left-0 z-0">
        <div
          className={`absolute inset-0 z-10 pointer-events-none transition-all duration-300 ${
            isActive ? 'bg-black/10' : 'bg-black/40'
          }`}
        />

        <Image
          src={image}
          fill
          priority
          alt={`${name} - ${title}`}
          sizes="(max-width: 768px) 50vw, 300px"

          className={`object-cover object-center z-0 transition-transform duration-500 ${
            isActive === num ? 'scale-100 brightness-110' : 'scale-100 brightness-40'
          }`}
        />
      </div>
    </div>
  )
}
