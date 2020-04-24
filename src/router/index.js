import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import {
  setKey
} from '@/utils/local'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '',
    name: 'login',
    component: Login,
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index.vue'),
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
          },
          {
            path: '/index/home/build',
            name: 'build',
            component: () => import('@/views/index/home/Build'),
          },
          {
            path: '/index/home/floor',
            name: 'floor',
            component: () => import('@/views/index/home/Floor'),
          }
        ]
      }, {
        path: '/index/system', //系统结构
        name: 'system',
        component: () => import('@/views/index/system/System'),

        children: [{
            path: '/index/system/systemStatistical',
            name: 'systemStatistical',
            component: () => import('@/views/index/system/SystemStatistical')
          },
          {
            path: '/index/system/WaterWarning',
            name: 'WaterWarning',
            component: () => import('@/views/index/system/WaterWarning')
          }
        ]
      },
      {
        path: '/index/historyRecoding',
        name: 'historyRecoding',
        component: () => import('@/views/index/HistoryRecoding')
      },
      {
        path: '/index/blank',
        name: 'blank',
        component: () => import('@/views/index/Blank')
      },
      // {
      //   path: '/index/service',
      //   component: () => import('@/views/index/service/Service')
      // },
      // {
      //   path: '/index/statistical',
      //   component: () => import('@/views/index/statistical/Statistical')
      // },
    ]
  },
  {
    path: '*',
    name: 404,
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})


// 路由拦截，路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/index/historyRecoding' && from.path != '/') {
    setKey('url', from.path)
  }
  next()
})

export default router

