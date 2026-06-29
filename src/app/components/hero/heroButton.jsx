import { TiArrowRightOutline } from 'react-icons/ti'

export default function HeroButton({ title, link, icon, setImage, image, indx }) {
  return (
    <div
      onMouseEnter={() => setImage(image, indx)}
      className="flex flex-row nowrap cursor-pointer gap-[5px] bg-vilagos font-bold text-zold p-[10px] rounded-[50px] items-center group "
    >
      {' '}
      <p>{title}</p>
      <span className="w-0 max-w-0 opacity-0 translate-x-[10px] overflow-hidden inline-flex items-center transition-all duration-300 ease-out group-hover:w-6 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0">
        {icon}
      </span>
    </div>
  )
}
