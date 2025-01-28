<script setup lang="ts">
import MenuTable from '../components/MenuTable.vue'
import { useAppStore } from '../stores/app'
import { nextTick, onMounted } from 'vue'
import { useScrollTo } from '@/utils/useScrollTo'

const appStore = useAppStore()

const createMenu = async () => {
  const { id } = appStore.createMenu()
  await nextTick()
  useScrollTo(id)
}

onMounted(() => {
  appStore.createMenu()
})
</script>

<template>
  <main>
    <MenuTable v-for="menu in appStore.menus" :key="menu.id" :id="menu.id" class="menus" />

    <button @click="createMenu">新增</button>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

.menus {
  margin-bottom: 2rem;
}
</style>
