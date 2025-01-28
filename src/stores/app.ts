import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MENU_ITEM } from '@/utils/constant'
import type { MenuItemType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const menus = ref<MenuItemType[]>([])

  const initMenus = () => {
    menus.value.push(createMenu())
  }

  const createMenu = (): MenuItemType => {
    const items = MENU_ITEM.map((item) => ({ ...item, count: null }))
    return { id: Math.random().toString(), date: new Date(), items }
  }

  return { menus, initMenus, createMenu }
})
