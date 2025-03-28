import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // New home component
import QuoteDetail from '../views/QuoteDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/quote/:id',
    name: 'QuoteDetail',
    component: QuoteDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
