import store from "@/store";
import router from "./index";

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        const routerName = to.meta.title;
        document.title = routerName;
        store.commit("app/SET_ROUTERNAME", routerName);
    }
    next();
});