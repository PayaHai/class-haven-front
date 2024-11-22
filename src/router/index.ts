import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import('@/views/Login.vue'),
    },
      {
      path: '/results-query',
      name: '成绩查询',
      component: () => import('@/views/ResultsQuery.vue'),
    },
  ],
})

export default router
