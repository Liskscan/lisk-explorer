export interface TopBarType {
  menu: {
    label: string
    link: string
  }[]
  subMenu: {
    title: string
    items: {
      label: string
      subLabel: string
      link: string
      icon: any
    }[]
  }

  actions?: {
    title: string
    action: any
  }[]
}

export interface FooterType {
  category: string
  items: {
    label: string
    link: string
  }[]
}

export interface HeroLinesDataType {
  path: string
  parseTitle?: boolean
  title: string | any
  subTitle: string
}
