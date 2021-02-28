<template>
    <div>
        <a-table
            v-if="isLoading !== true"
            :style="{ fontSize: '12px' }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="goodsList"
            :pagination="{ ...pagination, total, current }"
            @change="onChange"
        />
        <!-- total是计算属性 -->
        <div class="control-menu" v-if="isLoading !== true">
            <a-button @click="sell">上架</a-button>
            <a-button @click="offShelf">下架</a-button>
            <a-button @click="remove">删除</a-button>
        </div>
        <Loading v-if="isLoading === true" />
    </div>
</template>
<script>
import { mapState } from "vuex";
import service from "../services/index";
import { handleGoodsView } from "../util/index";
import Loading from "./Loading";

const columns = [
    {
        title: "id",
        dataIndex: "id",
    },
    {
        title: "标题",
        dataIndex: "title",
    },
    {
        title: "描述",
        dataIndex: "desc",
    },
    {
        title: "类目",
        dataIndex: "category",
    },
    {
        title: "预售价",
        dataIndex: "price",
    },
    {
        title: "折扣价",
        dataIndex: "price_off",
    },
    {
        title: "标签",
        dataIndex: "tags",
    },
    {
        title: "购买上限",
        dataIndex: "inventory",
    },
    {
        title: "状态",
        dataIndex: "status",
    },
];

export default {
    components: {
        Loading,
    },
    data() {
        return {
            pagination: {
                defaultPageSize: 6,
                hideOnSinglePage: true,
            },
            size: 6,
            columns,
            selectedRowKeys: [],
        };
    },
    computed: {
        ...mapState(["goodsList", "total", "isLoading", "total", "current", "isSearch"]),
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    methods: {
        sell() {
            // 后端没有接口
            console.warn("上架功能目前还没有实现");
            this.$notification.warning({
                message: "上架功能目前还没有实现",
                duration: 2.5,
            });
        },
        // 下架
        offShelf() {
            // 后端还没有接口
            console.warn("下架功能目前还没有实现");
            this.$notification.warning({
                message: "下架功能目前还没有实现",
                duration: 2.5,
            });
        },
        // 删除商品
        async remove() {
            this.$store.commit("setIsLoading", true);
            if (this.selectedRowKeys.length <= 0) {
                this.$notification.info({
                    message: "请选择删除的商品",
                    duration: 2.5,
                });
                this.$store.commit("setIsLoading", false);
                return;
            }
            const r = await service.removeGoods(this.selectedRowKeys);
            const result = await Promise.all(r);
            result.map(({ status }) => {
                if (status !== "success") {
                    return false;
                }
                // 删除成功
                this.$notification.success({
                    message: "删除成功",
                    duration: 2.5,
                });
                // 删除之后跳转到第 1 页 并重新获取数据渲染
                this.onRender();
            });
            this.$store.commit("setIsLoading", false);
        },
        // 选择框
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        async onRender() {
            this.$store.commit("setIsLoading", true);
            this.$store.commit("setCurrent", 1);
            const { data, status } = await service.getGoodsList({
                page: this.current,
                size: this.size,
            });

            if (status === "success") {
                this.$store.commit("setTotal", data.total);

                const newData = handleGoodsView(data.data, "key", "category", "status", "tags");
                this.$store.commit("setGoodsList", newData);
            }
            setTimeout(() => {
                this.$store.commit("setIsLoading", false);
            }, 300);
        },
        async onChange({ current }) {
            this.$store.commit("setCurrent", current);
            this.pagination.current = current;
            this.$store.commit("setIsLoading", true);
            const { data, status } = await service.getGoodsList({
                page: this.current,
                size: this.size,
            });
            const newData = handleGoodsView(data.data, "key", "category", "status", "tags");
            this.$store.commit("setGoodsList", newData);
            setTimeout(() => {
                this.$store.commit("setIsLoading", false);
            }, 300);
        },
    },
    created() {
        this.onRender();
    },
};
</script>

<style lang="less" scoped>
.ant-table-wrapper {
    width: 130%;
    margin-right: 180px;
}
.control-menu {
    float: left;
    position: relative;
    left: 50px;
    bottom: 50px;
    width: 300px;
    .ant-btn {
        margin-right: 15px;
    }
}
</style>
