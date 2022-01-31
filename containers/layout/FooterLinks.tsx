import { FC } from "react"
import { FooterType } from "@Types"

export const FooterLinks: FC<FooterType> = ({ category, items }) => {
  return (
    <div className="my-2 w-full h-auto">
      <div className=" font-medium text-onFooter uppercase mb-2">
        <b>{category}</b>
      </div>
      <ul className="list-reset leading-normal">
        {items &&
          items.map((item) => (
            <li
              key={`link-${item.label}`}
              className=" cursor-pointer  text-base text-onFooter hover:underline "
            >
              <a
                href={item.link}
                className="text-onFooter"
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
