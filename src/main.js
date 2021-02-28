import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeLine from "v-charts/lib/line.common";
import "./plugins/ant-design-vue.js";

Vue.component(VeLine.name, VeLine);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
