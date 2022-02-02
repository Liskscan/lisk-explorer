import { FC } from "react"
import { FooterLinks } from "./FooterLinks"
import { TwitterIcon } from "shared/icons"
import { FooterData } from "./data"

export const Footer: FC = () => (
  <div className={`w-full h-auto block text-onFooter text-left mt-8`}>
    <div className="relative top-0 bottom-0 w-full h-full bg-footer">
      <div className="container w-app max-w-app mx-auto px-6">
        <div className="sm:flex py-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            {FooterData &&
              FooterData.map((item) => (
                <div key={`link-${item.category}`} className="flex flex-col">
                  <FooterLinks {...item} />
                </div>
              ))}
            <div className="flex flex-col">
              <div className=" font-normal text-base mb-2 mt-4 uppercase ">
                <b>Socials</b>
              </div>
              <div className="w-full justify-center flex flex-row space-x-3">
                <a
                  href={"https://twitter.com/Liskscan"}
                  target={"_blank"}
                  rel={"noopener nofollow noreferrer"}
                >
                  <TwitterIcon className="cursor-pointer text-onFooter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-6">
      <div className=" border-gray-300 flex flex-col items-center">
        <div className="sm:w-2/3 text-center py-4">
          <p className="text-base text-onBackgroundLow font-bold mb-2">
            &copy;{new Date().getFullYear()}{" "}
            <a
              href={"https://github.com/liskscan/lisk-explorer"}
              className={"underline"}
            >
              Lisk Explorer
            </a>{" "}
            made with &#x2764;&nbsp;&nbsp;by{" "}
            <a
              className={"text-secondary"}
              target="_blank"
              rel="noopener noreferrer"
              href="https://moosty.com"
            >
              MOOSTY
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
)
