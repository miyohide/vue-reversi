import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'

Vue.config.productionTip = false

/* Vueのコンストラクタのオプション一覧
https://jp.vuejs.org/v2/api/#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%87%E3%83%BC%E3%82%BF
storeが上のオプションにはない。
Vue.use(Vuex)でstoreオプションが有効になる。
*/
new Vue({
  store: createStore(),
  render: h => h(App)
}).$mount('#app')
