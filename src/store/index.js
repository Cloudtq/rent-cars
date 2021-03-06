import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import app from "./modules/app";
import config from "./modules/config";
import location from "./modules/location";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        location,
        app,
        account,
        config,
    },
});