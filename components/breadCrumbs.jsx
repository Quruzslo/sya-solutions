import { Fragment } from "react";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";

export default function BreadCrumbs({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-fit mt-[50px] text-sm flex flex-row flex-wrap items-baseline gap-2"
    >
      <Link href="/" className="hover:text-arany transition-colors">
        Főoldal
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={index}>
            <HiChevronRight
              className="text-neutral-400 shrink-0 self-center"
              size={16}
            />
            {isLast ? (
              <span className="text-vilagos font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-arany transition-colors"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
