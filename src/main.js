//Element-UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App.vue";
import "./components/back";
//高德地图
import "./plugin/aMap";
import router from "./router";
// 全局路由守卫
import "./router/per";
import store from "./store";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");