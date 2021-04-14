import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
    path: "/",
    name: "Index",
    component: Index,
    children: [{
        //会员页
        path: '/user',
        name: 'User',
        meta: { title: '用户中心' },
        component: () =>
            import ('../views/user/index')
    }, {
        //安全设置
        path: '/safe',
        name: 'Safe',
        meta: { title: '安全设置' },
        component: () =>
            import ('../views/safe/index')
    }, {
        //修改密码页
        path: '/password',
        name: 'Password',
        meta: { title: '重置密码' },
        component: () =>
            import ('../views/safe/password')
    }, {
        //修改资金密码页
        path: '/fundpwd',
        name: 'Fundpwd',
        meta: { title: '重置资金密码' },
        component: () =>
            import ('../views/safe/fundpwd')
    }, {
        //设置银行卡
        path: '/bankcard',
        name: 'Bankcard',
        meta: { title: '设置银行卡' },
        component: () =>
            import ('../views/safe/bankcard')
    }, {
        //设置手机号
        path: '/phonenum',
        name: 'PhoneNum',
        meta: { title: '设置手机号' },
        component: () =>
            import ('../views/safe/phonenum')
    }, {
        //登陆
        path: '/login',
        name: 'Login',
        meta: { title: '登陆' },
        component: () =>
            import ('../views/account/login')
    }, {
        //注册
        path: '/register',
        name: 'Register',
        meta: { title: '注册' },
        component: () =>
            import ('../views/account/register')
    }, {
        //忘记密码
        path: '/forget',
        name: 'Forget',
        meta: { title: '忘记密码' },
        component: () =>
            import ('../views/account/forget')
    }]
}];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;