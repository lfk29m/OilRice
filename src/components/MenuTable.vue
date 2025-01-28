<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { MenuItemType } from '@/types'

const props = defineProps<Pick<MenuItemType, 'id'>>()

const appStore = useAppStore()

const menuItem = computed(() => appStore.menus.find((item) => item.id === props.id))

const removeMenuItem = () => {
  appStore.menus = appStore.menus.filter((item) => item.id !== props.id)
}
</script>

<template>
  <section v-if="menuItem" class="menuTable">
    <div class="menuTable__removeBtn" @click="removeMenuItem">X</div>
    <table>
      <thead>
        <tr>
          <th>項目</th>
          <th>單價</th>
          <th>數量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in menuItem.items" :key="item.name">
          <td class="name">{{ item.name }}</td>
          <td class="price">{{ item.price }}</td>
          <td class="count"><input v-model="item.count" type="number" /></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
.menuTable {
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;

  &__removeBtn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: #ff0000;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    text-align: left;
    padding: 0.25rem;
    overflow-wrap: break-word;
  }

  .name {
    width: 80px;
  }

  .price {
    width: 50px;
  }

  .count {
    width: 80px;

    input {
      width: 100%;
    }
  }
}
</style>
