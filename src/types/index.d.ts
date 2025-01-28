export type MenuItemType = {
  id: string

  /**
   * 是否外帶
   */
  isTakeAway: boolean

  /**
   * 桌號
   */
  tableNumber?: null | number
  date: Date
  items: {
    name: string
    price: number
    count?: null | number
  }[]
}
