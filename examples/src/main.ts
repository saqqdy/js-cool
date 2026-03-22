import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import naive from 'naive-ui'
import App from './App.vue'
import './assets/index.css'

const modules = import.meta.glob('./views/*.vue')

const routes = Object.keys(modules)
  .filter((path) => !path.includes('Home.vue'))
  .map((path) => {
    const name = path.match(/\.\/views\/(.+)\.vue$/)?.[1] || ''
    return {
      path: `/${name.toLowerCase()}`,
      name,
      component: modules[path],
    }
  })

routes.unshift({
  path: '/',
  name: 'Home',
  component: () => import('./views/Home.vue'),
})

const router = createRouter({
  history: createWebHistory('/js-cool/'),
  routes,
})

createApp(App).use(router).use(naive).mount('#app')
