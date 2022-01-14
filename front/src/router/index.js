import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import {verifyToken} from '@/services/apiWrapper.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/add',
        name: 'AddPage',
        component: () => import(/* webpackChunkName: "add" */ '../views/AddPage.vue'),
        props: true,
        meta: {
          showModal: true
        },
        children: [
          {
            path: ':service',
            name: 'AddServicePage',
            component: () => import(/* webpackChunkName: "add" */ '../views/AddServicePage.vue'),
            props: true,
            meta: {
              showModal: true
            }
          },
          {
            path: ':service/:widgetCode',
            name: 'ServiceAdder',
            component: () => import(/* webpackChunkName: "add" */ '../views/ServiceAdderPage.vue'),
            meta: {
              showModal: true
            },
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupPage.vue'),
  },
  {
    path: '/callback/:service',
    name: 'CallbackPage',
    component: () => import(/* webpackChunkName: "callback" */ '../views/CallbackPage.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const userIsLogged = async () => {
  let access_token = localStorage.getItem('access_token');

  if (!access_token)
    return false;
  return await verifyToken(access_token);
}

router.beforeEach(async (to,from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!await userIsLogged()) {
      next({name: 'LoginPage'})
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
