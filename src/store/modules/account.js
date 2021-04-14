import { Login, Register } from "@/api/account";
//cookies
import {
    getToken,
    getUsername,
    removeToken,
    removeUsername,
    setToken,
    setUsername,
} from "@/utils/cookiesCars";

const state = {
    token: "" || getToken(),
    username: "" || getUsername(),
};

const getters = {};
const mutations = {
    SET_TOKEN(state, value) {
        state.token = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    },
};

const actions = {
    registerAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Register(requestData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    loginAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData)
                .then((res) => {
                    context.commit("SET_TOKEN", res.data.token);
                    context.commit("SET_USERNAME", res.data.username);
                    setToken(res.data.token);
                    setUsername(res.data.username);
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    forgetAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Forget(requestData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    logoutAction(context, requestData) {
        return new Promise((resolve, reject) => {
            context.commit("SET_TOKEN", "");
            context.commit("SET_USERNAME", "");
            removeToken();
            removeUsername();
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};