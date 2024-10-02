<template>
  <div class="home">
    <DetailCard
      :product="product"
      :active="active.product_drawer"
      v-on:close-product-drawer="closeProductDrawer" />

    <div class="product-cards-container">
      <ProductCard
        v-for="product in items"
        :key="product.id" 
        :product = "product"
        v-on:view-product="viewProduct($event)" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductCard from '../components/products/ProductCard.vue'
import DetailCard from '../components/products/DetailCard.vue'

export default {
  name: 'HomeView',
  components: {
    ProductCard,
    DetailCard
  },
  data() {
    return {
      items: [],
      product: null,
      active: {
        product_drawer: false
      }
    }
  },
  created(){
    this.getCatalog()
  }
  ,
  methods: {
    getCatalog() {
      axios.get('https://652d0ef5f9afa8ef4b26b676.mockapi.io/catalog')
        .then((res) => {
          console.log(res.data)
          this.items = res.data
      })
        .catch((err) => {
          console.log(err)
      }) 
    },
    
    viewProduct(product) {
      this.product = product
      this.active.product_drawer = true
      console.log(this.product)
    },
    closeProductDrawer() {
      this.active.product_drawer = false
    }
    
  }

}
</script>

<style lang="scss">
  .product-cards-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
</style>
  