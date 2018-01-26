import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Components
const PagesRoot = () => import('@/components/Pages/Pages.Root.vue');
const index = () => import('@/components/Pages/index.vue');

// Routers
import PagesRouter from './pages.js';

export default new Router({
  mode:'history',
  routes: [
    { path: '/', component:index,name:"index" },
    {
      path: '/:pageName',
      props: false,
      component: PagesRoot,
      children: PagesRouter
    }
  ]
})
