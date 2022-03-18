import {FC, useState} from "react"
import { Dialog } from "@headlessui/react"
import {InformationCircleIcon} from "@heroicons/react/solid";
import {isBrowser} from "hooks";

export const Snackbar: FC<{
  message: string
  toggleState?: any
}> = ({message, toggleState}) => {
  let [isOpen, setIsOpen] = useState(true)
  const storedTheme =
    (isBrowser && window.localStorage.getItem("theme")) || "dark"

  return (
    <Dialog
      open={isOpen}
      onClose={(toggleState != null) ? () => toggleState("") : () => setIsOpen(false)}
      className={[
        `liskScan-${storedTheme}`,
        "fixed z-50 overflow-y-auto w-2/12 top-4 right-4 flex flex-row justify-end",
      ].join(" ")}
    >
      <Dialog.Overlay />
      <Dialog.Description>
        <div className="rounded-md bg-blue-100 max-w-app p-4 m-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-base text-blue-700">{message}</p>
            </div>
          </div>
        </div>
      </Dialog.Description>
    </Dialog>
  )
}
