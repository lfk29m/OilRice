import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MENU_ITEM } from '@/utils/constant'
import type { MenuItemType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const menus = ref<MenuItemType[]>([])

  const createMenu = () => {
    const items = MENU_ITEM.map((item) => ({ ...item, count: null }))
    const newMenuItem: MenuItemType = { id: Math.random().toString(), date: new Date(), items }
    menus.value.push(newMenuItem)
  }

  return { menus, createMenu }
})
