import { createStore } from 'vuex'

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
  state: {
    cart: [],
    count: 0,
  },
  getters: {
    productQuantity: state => product => {
      const item = state.cart.find(i => i.id === product.id)
      if (item) 
        return item.quantity
      else return 0
    },
    cartItems: state => {
      return state.cart
    },
    cartTotal: state => {
      return state.cart.reduce((a,b) => a + (b.price * b.quantity), 0)
    }
  },
  mutations: {
    addToCart (state, product) {
      let item = state.cart.find(i => i.id === product.id)


      if (item) {
        item.quantity++
  
      } else {
        state.cart.push({...product, quantity: 1})
      }
      
      state.count = state.cart.reduce((total, item) => total + item.quantity, 0)

      updateLocalStorage(state.cart)
    },
    removeFromCart(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      
      if(item){
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.cart = state.cart.filter(i => i.id !== product.id)
        }

        state.count = state.cart.reduce((total, item) => total + item.quantity, 0)
      }

      updateLocalStorage(state.cart)
    },
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
