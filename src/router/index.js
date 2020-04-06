import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/pages/Welcome'
import Main from '@/pages/Main'
import CodeBlock from '@/pages/codeBlock'
import Dashboard from '@/pages/dashboard'
import UploadQuestion from '@/pages/uploadQuestion'
import Personal from '@/pages/personalSpace'
import About from '@/pages/about'
import Forum from '@/pages/forum'
Vue.use(Router)

let router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        requireAuth:true
      }
    },
    {
      path: '/coding',
      name: 'coding',
      component: CodeBlock,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/upload',
      name: 'uploadQuestion',
      component: UploadQuestion,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requireAuth: true
      }
    }
  ]
})

export default router

// router.beforeEach((to, from, next) => {
//   let islogin = localStorage.getItem("MIState");
//   islogin = Boolean(Number(islogin));
//   if (to.meta.requireAuth) {
//     if (islogin) next();
//     else next("/");
//   }else{
//     console.log(islogin)
//     if (islogin) next("/main");
//     else next();
//   }
// })
