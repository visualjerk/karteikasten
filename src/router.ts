import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/box/:id',
    component: () => import('@/views/Box/Box.vue'),
    children: [
      {
        path: 'overview',
        component: () => import('@/views/Box/BoxOverview.vue'),
      },
      {
        path: 'edit',
        component: () => import('@/views/Box/BoxEdit.vue'),
      },
      {
        path: 'learn',
        component: () => import('@/views/Box/BoxLearn.vue'),
      },
    ],
  },
  {
    path: '/new-box',
    component: () => import('@/views/NewBox.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
