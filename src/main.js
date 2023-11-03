import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { store } from './store/store';
import { routes } from './routers/routers';


Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
routes
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
