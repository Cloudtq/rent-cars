const state = {
    message_item: {
        check_real_name: {
            msg: "您未实名验证，请先实名验证",
            router: "/authentication",
            type: "identity",
        },
        check_cars: {
            msg: "您未上传驾驶证，请先上传驾驶证，审核通过后便可租车",
            router: "/authentication",
            type: "drive",
        },
        gilding: {
            msg: "您还未交押金，请先交押金哦",
            router: "/recharge",
            type: "gilding",
        },
        illegalAmount: {
            msg: "您的预缴违章金额小于200元，请先预缴违章金额",
            router: "/recharge",
            type: "illegal",
        },
        bank: {
            msg: "请先绑定银行卡",
            router: "/authentication",
        },
    },
};

const mutations = {};

const actions = {};

const getters = {};

export default { namespaced: true, state, mutations, actions, getters };