<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { MenuItemType } from '@/types'
import dayjs from 'dayjs'
import { PRIMARY_TIME_FORMAT } from '@/utils/constant'

const props = defineProps<Pick<MenuItemType, 'id'>>()

const appStore = useAppStore()

const createAt = ref(dayjs().format(PRIMARY_TIME_FORMAT))

const menuItem = computed(() => appStore.menus.find((item) => item.id === props.id))

/**
 * 總價
 */
const totalPrice = computed(() => {
  if (!menuItem.value) return 0
  return menuItem.value.items.reduce((acc, item) => acc + item.price * (item.count ?? 0), 0)
})

const reset = () => {
  if (!menuItem.value) return
  createAt.value = dayjs().format(PRIMARY_TIME_FORMAT)
  menuItem.value.items.forEach((item) => {
    item.count = null
  })
}

const removeMenuItem = () => {
  appStore.menus = appStore.menus.filter((item) => item.id !== props.id)
}
</script>

<template>
  <section v-if="menuItem" :id="menuItem.id" class="menuTable">
    <div class="menuTable__controller">
      <button @click="reset">清空</button>
      <div class="menuTable__removeBtn" @click="removeMenuItem">X</div>
    </div>
    <div class="createAt">{{ createAt }}</div>
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
          <td class="count">
            <input
              v-model="item.count"
              type="number"
              inputmode="numeric"
              min="0"
              max="1000"
              step="1"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div class="menuTable__footer">
      <div class="totalPrice">總價: {{ totalPrice }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.menuTable {
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;

  &__controller {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__removeBtn {
    padding: 0.5rem;
    cursor: pointer;
    color: #ff0000;
  }

  .createAt {
    color: #898989;
    margin-bottom: 1rem;
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
    width: 50px;
  }

  .price {
    width: 30px;
  }

  .count {
    width: 80px;

    input {
      width: 100%;
    }
  }

  hr {
    margin: 1rem 0;
    border-color: #e9e9e93d;
  }

  &__footer {
    display: flex;
    align-items: center;
  }

  .totalPrice {
    font-size: 1.5rem;
    font-weight: 900;
    margin-left: auto;
  }
}
</style>
