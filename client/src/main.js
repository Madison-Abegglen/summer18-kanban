import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMDCAdapter from 'vue-mdc-adapter'
import 'vue-mdc-adapter/dist/vue-mdc-adapter.min.css'
Vue.use(VueMDCAdapter)

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('authenticate')
  },
  render: h => h(App)
}).$mount('#app')
