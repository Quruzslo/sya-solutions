export default function SectionOneCard({ title, desc, number }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 relative rounded-sm p-[10px] bg-zold !text-vilagos ">
      <h3 className="!text-[20px] font-black">{title}</h3>
      <p className="!text-[15px] text-pretty">{desc}</p>
      <span className="absolute flex items-center justify-center top-[-5px] right-[-5px] text-transparent font-bold text-[20px] [-webkit-text-stroke:1px_var(--color-zold)] bg-feher p-[10px] rounded-full w-[35px] h-[35px]">
        #{number}
      </span>
    </div>
  )
}
