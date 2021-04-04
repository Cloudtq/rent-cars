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
        component: () =>
            import ('../views/user/index')
    }, {
        //安全设置
        path: '/safe',
        name: 'Safe',
        component: () =>
            import ('../views/safe/index')
    }, {
        //修改密码页
        path: '/password',
        name: 'Password',
        component: () =>
            import ('../views/safe/password')
    }, {
        //修改密码页
        path: '/fundpwd',
        name: 'Fundpwd',
        component: () =>
            import ('../views/safe/fundpwd')
    }, {
        //修改密码页
        path: '/bankcard',
        name: 'Bankcard',
        component: () =>
            import ('../views/safe/bankcard')
    }, {
        //修改密码页
        path: '/phonenum',
        name: 'PhoneNum',
        component: () =>
            import ('../views/safe/phonenum')
    }]
}];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;