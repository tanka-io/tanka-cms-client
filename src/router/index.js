import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Components
const PagesRoot = () => import('@/components/Pages/Pages.Root.vue');

// Routers
import PagesRouter from './pages.js';

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'page',params:{pageName:""} } },
    {
      path: '/:pageName',
      props: false,
      component: PagesRoot,
      children: PagesRouter
    }
  ]
})
