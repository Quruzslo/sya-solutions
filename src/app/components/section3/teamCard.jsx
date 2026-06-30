import Image from 'next/image'

export default function TeamCard({ title, name, desc, num, image }) {
  return (
    <div className="flex flex-col gap-3 w-full relative ">
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={image}
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"
          className={`object-cover object-center `}
        ></Image>
      </div>
      <div className="flex flex-col md:flex-row">
        <p>{name}</p>
        <p>{title}</p>
      </div>
      <p>{desc}</p>
    </div>
  )
}
