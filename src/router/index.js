import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import CheckOutView from '../views/CheckOutView.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/cart', name: 'CartView', component: CartView },
  { path: '/checkout', name: 'CheckOutView', component: CheckOutView },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
