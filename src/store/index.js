import Vue from "vue";
import Vuex from "vuex";
import service from "../services/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        step: 0,
        category: [],
        goodsList: [],
        total: 0,
        current: 1,
        isLoading: false,
        username: "",
    },
    mutations: {
        changeStep(state, num) {
            state.step = num;
        },
        setCategory(state, categoryArr) {
            state.category = categoryArr;
        },
        setGoodsList(state, list) {
            state.goodsList = list;
        },
        setTotal(state, total) {
            state.total = total;
        },
        setCurrent(state, current) {
            state.current = current;
        },
        setIsLoading(state, value) {
            state.isLoading = value;
        },
        setUsername(state, name) {
            state.username = name;
        },
    },
    actions: {
        async getCategory({ commit }, { page, size }) {
            const { data, status } = await service.getCategory({ page, size });
            if (status === "success") {
                const categoryArr = [];
                data.data.forEach(item => {
                    categoryArr.push({ name: item.name, id: +item.id });
                });
                commit("setCategory", categoryArr);
            }
        },
    },
    modules: {},
});
