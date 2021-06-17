import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import components from './components/install'
import './style/main.scss'

Vue.config.productionTip = false
Vue.use(components);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
