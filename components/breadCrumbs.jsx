import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'

export default function BreadCrumbs({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full mt-[50px] text-sm flex items-center flex-wrap gap-2"
    >
      <Link href="/" className="hover:text-arany transition-colors">
        Főoldal
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2 ">
            <HiChevronRight className="text-neutral-400 shrink-0" size={16} />

            {isLast ? (
              <span className="text-vilagos font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.url} className="hover:text-arany transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
