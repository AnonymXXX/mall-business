<template>
    <div>
        <a-button class="add-btn" @click="addCategory">新增</a-button>

        <a-table
            :pagination="{ ...pagination, total }"
            bordered
            :data-source="dataSource"
            :columns="columns"
            @change="onChange"
            v-if="isLoading !== true"
        >
            <template slot="operation" slot-scope="text, record">
                <a-button v-if="dataSource.length" @click="() => onEdit(record.key)">编辑</a-button>
                <a-divider type="vertical" />
                <a-popconfirm
                    v-if="dataSource.length"
                    title="确定要删除？"
                    @confirm="() => onDelete(record.key)"
                >
                    <a-button>删除</a-button>
                </a-popconfirm>
            </template>
        </a-table>

        <Loading v-else />
        <FormModal
            :visible="visible"
            @changeVisible="changeVisible"
            :id="id"
            @getCategory="getCategory"
            @addCategory="addCategory"
            :type="type"
        />
    </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "./Loading";
import FormModal from "./FormModal";
import service from "../services/index";

const columns = [
    {
        title: "类目名称",
        dataIndex: "name",
    },
    {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
    },
];
export default {
    components: {
        Loading,
        FormModal,
    },
    computed: {
        ...mapState(["category", "isLoading", "current"]),
        total() {
            return this.category.length;
        },
    },
    data() {
        return {
            columns,
            dataSource: [],
            visible: false,
            id: 0,
            // 用于区分编辑和添加
            type: {
                text: "",
                id: 0,
            },
            pagination: {
                defaultPageSize: 5,
                current: 1,
                hideOnSinglePage: true,
            },
        };
    },
    methods: {
        async addCategory({ name, c_items }) {
            this.visible = true;

            this.type = {
                text: "添加",
                id: 1,
            };
        },
        onEdit(id) {
            this.visible = true;

            this.id = id;
            this.type = {
                text: "编辑",
                id: 2,
            };
        },
        onChange({ current }) {
            this.$store.commit("setIsLoading", true);
            this.$store.commit("setCurrent", current);
            this.pagination.current = this.current;
            // 延迟用于测试
            setTimeout(() => {
                this.$store.commit("setIsLoading", false);
            }, 300);
        },
        changeVisible(val) {
            this.visible = val;
        },
        async onDelete(id) {
            const { status } = await service.removeCategory(id);
            if (status === "success") {
                this.$notification.success({
                    message: "删除成功",
                    duration: 2.5,
                });

                // 类目删除成功，重新获取类目数据，重新渲染
                this.getCategory();
            }
        },
        getCategory() {
            this.$store.commit("setIsLoading", true);
            this.$store.dispatch("getCategory", {});
            let categoryArr = [];
            //延迟 用于测试

            setTimeout(() => {
                if (this.category.length) {
                    this.category.map(item => {
                        categoryArr.push({ id: item.id, key: item.id, name: item.name });
                    });
                }
                this.dataSource = categoryArr;
                this.$store.commit("setIsLoading", false);
            }, 300);
        },
    },
    created() {
        this.$store.commit("setCurrent", 1);
        this.getCategory();
    },
};
</script>

<style scoped>
.add-btn {
    margin: 20px;
}
</style>
