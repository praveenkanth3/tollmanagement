import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { store } from './store';
import OperatorPage from './components/OperatorPage.vue'
import LandingPage from './components/LandingPage.vue'
import AdminDetailPage from './components/AdminDetailPage.vue'


Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: LandingPage
  },
  {
      path:'/operator',
      component: OperatorPage
  },
  {
    path:'/admindetail',
    component: AdminDetailPage,
  }
  // {
  //     path:'/about',
  //     component: AboutPage
  // },
  // {
  //   path:'/cart',
  //   component: cartPage
  // }
];

const router = new VueRouter({
routes
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
