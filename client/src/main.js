import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMDCAdapter from 'vue-mdc-adapter'
Vue.use(VueMDCAdapter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')
