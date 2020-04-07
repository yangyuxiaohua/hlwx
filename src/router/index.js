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
    component: () => import('../views/Index.vue'),
    children: [{
      path: '/index/home',
      name: 'home',
      component: () => import('@/views/index/home/Home'),
      children: [{
          path: '/index/home/map',
          name: 'map',
          component: () => import('@/views/index/home/Map'),
        },
        {
          path: '/index/home/region',
          name: 'region',
          component: () => import('@/views/index/home/Region'),
          // children: [{
          //   path: '/index/home/region/regionMap',
          //   name: 'regionMap',
          //   component: () => import('@/views/index/home/Map')
          // }]
        },
        {
          path: '/index/home/build',
          name: 'build',
          component: () => import('@/views/index/home/Build'),
          // children: [{
          //   path: '/index/home/build/buildRegion',
          //   name: 'buildRegion',
          //   component: () => import('@/views/index/home/Region')
          // }]
        },
        {
          path: '/index/home/floor',
          name: 'floor',
          component: () => import('@/views/index/home/Floor'),
          // children: [{
          //   path: '/index/home/floor/floorBuild',
          //   name: 'floorBuild',
          //   component: () => import('@/views/index/home/Build')
          // }]
        }
      ]
    }, {
      path: '/index/system', //系统结构
      name:'system',
      component: () => import('@/views/index/system/System')
    }, 
    {
      path:'/index/historyRecoding',
      name:'historyRecoding',
      component:()=>import('@/views/index/HistoryRecoding')
    },{
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