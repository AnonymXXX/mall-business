<template>
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
        <a-form-model-item ref="title" label="副标题" prop="title">
            <a-input
                v-model="form.title"
                @blur="
                    () => {
                        $refs.title.onFieldBlur();
                    }
                "
            />
        </a-form-model-item>

        <a-form-model-item label="商品描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" style="resize:none" />
        </a-form-model-item>

        <a-form-model-item label="商品类目" prop="category" ref="category">
            <a-select
                v-model="form.category"
                placeholder="请选择商品类目"
                @blur="
                    () => {
                        $refs.category.onFieldBlur();
                    }
                "
            >
                <a-select-option v-for="item in category" :key="item.id">
                    {{ item.name }}
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="选择所属子类目">
            <a-select v-model="form.c_items" placeholder="选择所属子类目">
                <a-select-option value="test3">
                    test1
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="选择标签：" prop="tags">
            <a-select
                mode="tags"
                :token-separators="[',']"
                v-model="form.tags"
                placeholder="请设置标签"
            >
                <a-select-option v-for="item in form.tags" :key="item">
                    {{ item }}
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button type="primary" @click="onNext">
                下一步
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["category"]),
    },
    props: ["form"],
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            rules: {
                title: [{ required: true, message: "Please input your title", trigger: "blur" }],
                tags: [{ required: true, message: "Please input your tags", trigger: "blur" }],
                category: [
                    { required: true, message: "Please input your category", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        onNext() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$store.commit("changeStep", 1);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    created() {
        this.$store.dispatch("getCategory", {});
    },
};
</script>

<style lang="less" scoped>
.ant-form {
    background: #fafafa;
    padding-top: 30px;
    height: 100%;
    width: 100%;
    position: fixed;
    min-width: 1000px;
}
</style>
