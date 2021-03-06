import { createRouter, createWebHistory } from 'vue-router'
import constRoutes from './userRouters'

const asyncRoutes = Object.values(import.meta.globEager('./subRouters/*.ts')).map(
  ({ default: route }) => route[0]
)

export { constRoutes, asyncRoutes }

const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
  scrollBehavior: (to, from, savePosition: any) => savePosition || { left: 0, top: 0 }
})

export const removeRoute = (lastTimeName: string[]) => {
  for (const name of lastTimeName) {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  }
}

export default router
