import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routes";
import { getCookie } from "@/util";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});

store.commit("setUsername", getCookie("username"));

router.beforeEach((to, from, next) => {
    // 1. 如果当前不是登录页，并且没有登录过，那么跳转到登录页
    // 2. 跳转到登录页，当前是登录页，next() 
    // 3. 登录之后跳转首页，能获取username，然后就放行

    if (to.name !== "login") {
        if (!store.state.username) {
            next("/login");
        } else {
            // 放行
            next();
        }
    } else {
        if (store.state.username) {
            // 放行
            next("/");
        } else {
            next();
        }
    }
});

export default router;
