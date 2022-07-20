import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/box/:id',
    component: () => import('./views/Box.vue'),
  },
  {
    path: '/box/:id/edit',
    component: () => import('./views/BoxEdit.vue'),
  },
  {
    path: '/new-box',
    component: () => import('./views/NewBox.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
