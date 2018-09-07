import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMDCAdapter from 'vue-mdc-adapter'
import 'vue-mdc-adapter/dist/vue-mdc-adapter.min.css'

import VueDragDrop from 'vue-drag-drop'

Vue.use(require('vue-moment'))
Vue.use(VueMDCAdapter)
Vue.use(VueDragDrop)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('authenticate')
  },
  render: h => h(App)
}).$mount('#app')
