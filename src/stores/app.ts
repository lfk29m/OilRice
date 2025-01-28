import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MENU_ITEM } from '@/utils/constant'
import { useUUID } from '@/utils/useUUID'
import type { MenuItemType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const menus = ref<MenuItemType[]>([])

  const createMenu = () => {
    const id = `menuTable-${useUUID()}`
    const items = MENU_ITEM.map((item) => ({ ...item, count: null }))
    const newMenuItem: MenuItemType = { id, date: new Date(), items }
    menus.value.push(newMenuItem)
    return newMenuItem
  }

  return { menus, createMenu }
})
