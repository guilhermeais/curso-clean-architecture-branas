<script setup lang="ts">
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import CheckoutGateway from './gateway/CheckoutGateway'
import Order from './entity/Order'
import Product from './entity/Product'

const checkoutGateway = inject<CheckoutGateway>('CheckoutGateway')
const order = ref(new Order('A'))
const products = ref<Product[]>([])

const result = ref({})

async function checkout() {
  result.value = await checkoutGateway.checkout(order.value)
}

onMounted(async () => {
  products.value = await checkoutGateway.getProducts()
})
</script>

<template>
  <div>
    <div class="module-name">Checkout</div>

    <div :key="index" v-for="[index, product] of Object.entries(products)">
      <div class="product-description">
        {{ product.description }}
      </div>

      <div class="product-price">
        {{ product.price }}
      </div>

      <button class="product-add-button" @click="order.addItem(product)">
        Adicionar Produto
      </button>
    </div>
    <div class="total">
      {{ order.total }}
    </div>

    <div :key="index" v-for="[index, item] of Object.entries(order.items)">
      <div class="order-item">{{ item.idProduct }} {{ item.quantity }}</div>
    </div>

    <button class="checkout-button" @click="checkout">Checkout</button>

  </div>
</template>

<style scoped></style>
