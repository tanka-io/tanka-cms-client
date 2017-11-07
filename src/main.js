// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Store
import store from './store'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);


// Font Awesome
import 'font-awesome/css/font-awesome.min.css'

// Google charts
import VueCharts from 'vue-charts';
Vue.use(VueCharts)

// Filters
import moment from 'moment';
Vue.filter('formatDate', function (x) {
  if (x) {
    return moment(String(x)).format('DD/MM/YYYY')
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
