import {
  ArrowSmDownIcon,
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  ArrowSmUpIcon,
} from "@heroicons/react/solid"

export const hotKeysCombos = [
  {
    category: "Actions",
    keys: [
      {
        id: 8,
        label: "Search",
        keys: ["/"],
      },
      {
        id: 10,
        label: "Hot keys",
        keys: ["ctrl", "/"],
      },
      {
        id: 1,
        label: "Select All",
        keys: ["ctrl", "a"],
      },
      {
        id: 1,
        label: "Pagination",
        keys: [<ArrowSmLeftIcon className={"h-5 w-5"} />],
      },
      {
        id: 1,
        label: "",
        keys: [<ArrowSmRightIcon className={"h-5 w-5"} />],
      },
      {
        id: 1,
        label: "Scroll",
        keys: ["shift", <ArrowSmUpIcon className={"h-5 w-5"} />],
      },
      {
        id: 1,
        label: "",
        keys: ["shift", <ArrowSmDownIcon className={"h-5 w-5"} />],
      },
    ],
  },
  {
    category: "Account",
    keys: [
      {
        label: "Copy Address",
        keys: ["c", "a"],
      },
      {
        label: "Copy Public Key",
        keys: ["c", "p"],
      },
      {
        label: "Copy Username",
        keys: ["c", "u"],
      },
      {
        label: "Copy Link",
        keys: ["c", "l"],
      },
    ],
  },
  {
    category: "Transaction",
    keys: [
      {
        label: "Copy Sender",
        keys: ["c", "s"],
      },
      {
        label: "Copy Recipient",
        keys: ["c", "r"],
      },
      {
        label: "Copy Link",
        keys: ["c", "l"],
      },
      {
        label: "Goto Sender",
        keys: ["g", "s"],
      },
      {
        label: "Goto Recipient",
        keys: ["g", "r"],
      },
    ],
  },
  {
    category: "Goto page:",
    keys: [
      {
        id: 5,
        label: "Home",
        keys: ["H"],
      },
      {
        id: 2,
        label: "Delegates",
        keys: ["D"],
      },
      {
        id: 3,
        label: "Transactions",
        keys: ["t"],
      },
      {
        id: 5,
        label: "Votes",
        keys: ["v"],
      },
      {
        id: 6,
        label: "Chain info",
        keys: ["i"],
      },
      {
        id: 7,
        label: "Address analyzer",
        keys: ["a"],
      },
    ],
  },
  {
    category: "Theme",
    keys: [
      {
        id: 11,
        label: "Switch theme",
        keys: ["shift", "t"],
      },
      {
        id: 11,
        label: "Fiat menu",
        keys: ["f"],
      },
      {
        id: 11,
        label: "Convert currency",
        keys: ["shift", "c"],
      },
      {
        id: 1,
        label: "Mantissa size",
        keys: ["shift", <ArrowSmLeftIcon className={"h-5 w-5"} />],
      },
      {
        id: 1,
        label: "",
        keys: ["shift", <ArrowSmRightIcon className={"h-5 w-5"} />],
      },
    ],
  },
] as {
  category: string
  keys: {
    id: number
    label: string
    keys: string[]
  }[]
}[]
