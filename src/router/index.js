import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Main from '@/components/Main'
import CodeBlock from '@/components/codeBlock'

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
