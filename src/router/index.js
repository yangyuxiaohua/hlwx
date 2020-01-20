import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: ' login',
    component: Login,
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Index.vue'),
    children: [{
      path: '/index/home',
      component: () => import('@/views/index/home/Home')
    }, {
      path: '/index/equipment',
      component: () => import('@/views/index/equipment/Equipment')
    }, {
      path: '/index/service',
      component: () => import('@/views/index/service/Service')
    }, {
      path: '/index/statistical',
      component: () => import('@/views/index/statistical/Statistical')
    }, ]
  },
  {
    path: '*',
    name: 404,
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router