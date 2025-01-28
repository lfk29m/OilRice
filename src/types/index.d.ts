export type MenuItemType = {
  id: string

  /**
   * 是否外帶
   */
  isTakeAway: boolean

  /**
   * 桌號
   */
  tableNumber: string | number
  date: Date
  items: {
    name: string
    price: number
    count: string | number
  }[]
}
