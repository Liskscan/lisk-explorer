import { CubeIcon } from "@heroicons/react/solid"
import { TopBarType } from "@Types"

export const TopBarData: TopBarType = {
  menu: [
    { label: "Transactions", link: "/transactions" },
    { label: "Delegates", link: "/delegates" },
    { label: "Votes", link: "/votes" },
  ],
  subMenu: {
    title: "Tools",
    items: [
      {
        label: "Blocks",
        subLabel: "Browse all blocks",
        link: "/blocks",
        icon: (
          <CubeIcon className={"flex-shrink-0 h-6 w-6 text-onSurfaceLight"} />
        ),
      },
      {
        label: "Top Accounts",
        subLabel: "Overview of all the top Lisk accounts.",
        link: "/top",
        icon: (
          <svg
            className="flex-shrink-0 h-6 w-6 text-onSurfaceLight"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        ),
      },
      {
        label: "Network",
        subLabel: "Overview of all the nodes supporting the Lisk Network.",
        link: "/network",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 h-6 w-6 text-onSurfaceLight"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      {
        label: "Assets",
        subLabel: "Overview of all the assets used by the Lisk blockchain.",
        link: "/assets",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 h-6 w-6 text-onSurfaceLight"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        ),
      },
      {
        label: "Chain Info",
        subLabel: "Raw information about the Lisk Blockchain.",
        link: "/chain-info",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 h-6 w-6 text-onSurfaceLight"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        ),
      },
      {
        label: "Your custom page here",
        subLabel: "Customize the explorer fully",
        link: "/",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 h-6 w-6 text-onSurfaceLight"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        ),
      },
    ],
  },

  actions: [],
}
