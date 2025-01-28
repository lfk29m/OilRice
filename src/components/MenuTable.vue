<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { MenuItemType } from '@/types'
import dayjs from 'dayjs'
import { PRIMARY_TIME_FORMAT } from '@/utils/constant'
import { useScrollTo } from '@/utils/useScrollTo'

const props = defineProps<Pick<MenuItemType, 'id'>>()

const appStore = useAppStore()

const createAt = ref(dayjs().format(PRIMARY_TIME_FORMAT))

const menuItem = computed(() => appStore.menus.find((item) => item.id === props.id))

/**
 * 總價
 */
const totalPrice = computed(() => {
  if (!menuItem.value) return 0
  return menuItem.value.items.reduce((acc, item) => acc + item.price * Number(item.count), 0)
})

/**
 * 交付金額
 */
const payPrice = ref<string | number>('')

/**
 * 找錢金額
 */
const returnPrice = computed(() => {
  if (payPrice.value === '') return 0
  return Number(payPrice.value) - totalPrice.value
})

const reset = () => {
  if (!menuItem.value) return
  createAt.value = dayjs().format(PRIMARY_TIME_FORMAT)
  payPrice.value = ''
  menuItem.value.isTakeAway = false
  menuItem.value.tableNumber = ''
  menuItem.value.items.forEach((item) => {
    item.count = ''
  })
}

const removeMenuItem = () => {
  const targetIndex = appStore.menus.findIndex((item) => item.id === props.id)
  if (targetIndex > 0) useScrollTo(appStore.menus[targetIndex - 1].id)
  appStore.menus = appStore.menus.filter((item) => item.id !== props.id)
}
</script>

<template>
  <section v-if="menuItem" :id="menuItem.id" class="menuTable">
    <div class="menuTable__controller">
      <button @click="reset">清空</button>
      <div class="menuTable__removeBtn" @click="removeMenuItem">X</div>
    </div>
    <div class="menuTable__type">
      <div>
        <label for="isTakeAway">外帶</label>
        <input v-model="menuItem.isTakeAway" type="checkbox" id="isTakeAway" />
      </div>
      <div>
        <label for="isIn">內用</label>
        <input v-model="menuItem.tableNumber" type="number" inputmode="numeric" id="isIn" />
      </div>
    </div>
    <div class="createAt">{{ createAt }}</div>
    <hr />
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
      <p class="payPrice">
        交付: <input v-model="payPrice" type="number" inputmode="numeric" class="payPrice__input" />
      </p>
      <p>總價: {{ totalPrice }}</p>
      <p>找錢: {{ returnPrice }}</p>
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

  &__type {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;

    label {
      margin-right: 0.5rem;
    }
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
    text-align: right;
    font-size: 1.5rem;
    font-weight: 900;
  }

  .payPrice__input {
    width: 100px;
  }
}
</style>
