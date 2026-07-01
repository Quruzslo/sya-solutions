export default function SectionTitles({ title, bgText }) {
  return (
    <div className="flex flex-col relative w-full">
      <h2 className="!text-[20px] !md:text-[30px] text-sotet font-black">{title}</h2>
      <p className="absolute flex top-[-25px] md:top-[-50px] left-0 text-zold font-bold text-[25px] md:text-[60px] xl:text-[100px]  opacity-10">
        {bgText}
      </p>
    </div>
  )
}
