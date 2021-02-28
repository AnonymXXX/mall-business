<template>
    <div class="search-wrapper">
        <div class="search-header">
            <div class="search-input">
                搜索关键字：<template>
                    <a-input placeholder="请输入关键字" @pressEnter="pressEnter" v-model="value" />
                </template>
            </div>
            <div class="select-list">
                商品类目：<a-select
                    placeholder="请选择商品类目"
                    style="width: 200px"
                    @change="handleChange"
                    v-model="type"
                >
                    <a-select-option v-for="item in categoryArr" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>

                <a-button type="primary" @click="onSearch">
                    搜索
                </a-button>
            </div>
            <a-button @click="addGoods">新增商品</a-button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import service from "../services/index";
import { searchByCategory } from "../util/index";

export default {
    computed: {
        ...mapState(["category"]),
        categoryArr() {
            let categoryArr = this.category;
            categoryArr.unshift({ id: -1, name: "全部" });
            return categoryArr;
        },
    },
    data() {
        return {
            filterOption: "",
            value: "",
            type: "全部",
            size: 6,
        };
    },
    methods: {
        async onSearch() {
            this.$store.commit("setIsLoading", true);

            searchByCategory(this, this.type, this.value.trim());
            // 设置延迟用于测试
            setTimeout(() => {
                this.$store.commit("setIsLoading", false);
            }, 500);
        },
        addGoods() {
            this.$router.push("/productAdd");
        },
        async pressEnter() {
            const searchWord = this.value.trim();
            if (!searchWord) {
                return;
            }
            const result = await service.getGoodsList({ searchWord });
            console.log(result);
        },
        handleChange(type) {
            this.$store.commit("setIsLoading", true);
            this.$store.commit("setCurrent", 1);
            searchByCategory(this, type, this.value.trim());

            // 设置延迟用于测试
            setTimeout(() => {
                this.$store.commit("setIsLoading", false);
            }, 500);
        },
    },
    created() {
        this.$store.dispatch("getCategory", {});
    },
};
</script>

<style lang="less" scoped>
.search-wrapper {
    background: #fff;
    width: 100%;
    min-width: 950px;
    .search-header {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        .ant-select {
            margin-right: 10px;
        }
        .ant-input {
            width: 200px;
        }
    }
}
</style>
