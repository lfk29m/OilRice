export type MenuItemType = {
  id: string
  date: Date
  items: {
    name: string
    price: number
    count?: null | number
  }[]
}
