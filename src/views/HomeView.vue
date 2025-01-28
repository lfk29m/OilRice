<script setup lang="ts">
import MenuTable from '../components/MenuTable.vue'
import { useAppStore } from '../stores/app'
import { onMounted } from 'vue'

const appStore = useAppStore()

onMounted(() => {
  appStore.initMenus()
})
</script>

<template>
  <main>
    <MenuTable v-for="menu in appStore.menus" :key="menu.id" :id="menu.id" class="menus" />
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
