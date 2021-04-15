const state = {
    //是否点击了车辆列表
    isClickCarsList: true,
    //是否请求车辆列表
    isRequestCarsList: false,

    //路由名称
    routerName: "",
};

const mutations = {
    CHANGE_CarsListFlag(state, value) {
        state.isClickCarsList = value;
    },
    CHANGE_RequestListFlag(state, value) {
        state.isRequestCarsList = value;
    },

    SET_ROUTERNAME(state, value) {
        state.routerName = value;
    },
};

const actions = {};
const getters = {};

export default { namespaced: true, state, mutations, actions, getters };