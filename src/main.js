import Vue from "vue";
import App from "./App.vue";
import VueGooglePlaces from 'vue-google-places'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import axios from 'axios'
Vue.config.productionTip = false;
Vue.use(VueGooglePlaces)
Vue.use(VueGoogleAutocomplete)
Vue.prototype.$http = axios
new Vue({
  render: (h) => h(App),
}).$mount("#app");
