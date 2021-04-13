import { Register } from '@/api/account'

const state = {
    token: '',
    username: ''
}

const getters = {}
const mutations = {

}

const actions = {
    registerAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Register(requestData).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}