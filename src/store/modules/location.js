const state = {
    selfLocation: true,
    parking_info: [],
};
const mutations = {
    SELF_LOCATION(state) {
        state.selfLocation = !state.selfLocation;
    },
    SET_PARKING_INFO(state, value) {
        state.parking_info = value;
    },
};
const actions = {};
const getters = {};

export default { namespaced: true, state, mutations, actions, getters };