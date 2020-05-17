import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectBudjet from '@/components/ProjectBudjet'
import ExpectedFunding from '@/components/ExpectedFunding'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: ProjectBudjet
  },
  {
    path: '/sos',
    component: ExpectedFunding
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
