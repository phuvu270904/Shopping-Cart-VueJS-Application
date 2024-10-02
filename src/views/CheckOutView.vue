<template>
  <div class='checkout'>
    <h1>This is Your History</h1>
    <div class="checkout-cards-container">
      <CheckOutCard
        v-for="product in items"
        :key="product.id" 
        :product = "product"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CheckOutCard from '../components/checkout/CheckOutCard.vue'


export default {
  components: {
    CheckOutCard
  },
  data() {
    return {
      items: [],
    }
  },
  mounted(){
    this.getCatalog()
  }
  ,
  methods: {
    getCatalog() {
      const myApi = 'https://652d0ef5f9afa8ef4b26b676.mockapi.io/cart/1'
      axios.get(myApi)
        .then((res) => {
          const items = res.data.items;
          this.items = items;
      })
        .catch((err) => {
          console.log(err)
      }) 
    }
  }
}
</script>