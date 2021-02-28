import Home from "@/views/Home.vue";
import Statistics from "@/components/Statistics.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default [
    {
        path: "/",
        redirect: "/statistics",
    },
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                meta: {
                    title: "统计",
                    key: "1",
                },
                path: "/statistics",
                component: Statistics,
            },
            {
                meta: {
                    title: "商品列表",
                    key: "2",
                },
                path: "/productList",
                component: () => import("@/components/GoodsList.vue"),
            },
            {
                meta: {
                    title: "添加商品",
                    key: "3",
                },
                path: "/productAdd",
                component: () => import("@/components/GoodsAdd.vue"),
            },
            {
                meta: {
                    title: "修改分类",
                    key: "4",
                },
                path: "/productCategory",
                component: () => import("@/components/ChangeType.vue"),
            },
            {
                path: "/statistics",
            },
        ],
    },

    {
        path: "/login",
        component: Login,
        name: "login",
    },
    {
        path: "/register",
        component: Register,
        name: "register",
    },
];
