<template>
    <div>
        <a-modal v-model="visible" :title="`${type.text}类目`" @ok="handleOk" @cancel="cancel">
            <a-form-model
                ref="ruleForm"
                :model="form"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-model-item ref="name" label="类目名称" prop="name">
                    <a-input
                        style="width: 130%"
                        v-model="form.name"
                        @blur="
                            () => {
                                $refs.name.onFieldBlur();
                            }
                        "
                    />
                </a-form-model-item>

                <a-form-model-item ref="c_items" label="子类名称" prop="c_items">
                    <a-input
                        style="width: 130%"
                        v-model="form.c_items"
                        @blur="
                            () => {
                                $refs.c_items.onFieldBlur();
                            }
                        "
                    />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import { mapState } from "vuex";
import service from "../services/index";

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                name: "",
                c_items: "",
            },
            rules: {
                name: [{ required: true, message: "Please input name", trigger: "blur" }],
                c_items: [{ required: true, message: "Please input c_items", trigger: "blur" }],
            },
        };
    },
    computed: {
        ...mapState(["category"]),
    },
    props: ["visible", "id", "type"],
    methods: {
        handleOk(e) {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    // 通知更改visible属性
                    this.$emit("changeVisible", false);
                    // isLoading状态会在 getCategory 方法里面重新设置为false
                    this.$store.commit("setIsLoading", true);
                    const { name, c_items } = this.form;
                    if (this.type.id === 1) {
                        // 添加类目
                        const id = (
                            Date.now() +
                            Math.random()
                                .toString()
                                .substr(5, 10)
                        ).substr(15);
                        this.$store.commit("setIsLoading", false);

                        const { status } = await service.addCategory(id, name, c_items);
                        if (status === "success") {
                            this.$notification.success({
                                message: "添加成功",
                                duration: 2.5,
                            });

                            // 重置表单
                            this.$refs.ruleForm.resetFields();

                            // 类目修改成功，通知重新获取类目数据，重新渲染
                            this.$emit("getCategory");
                        }
                    } else {
                        // 编辑类目
                        const { status } = await service.editCategory(this.id, name, c_items);
                        if (status === "success") {
                            this.$notification.success({
                                message: "修改成功",
                                duration: 2.5,
                            });
                            // 重置表单
                            this.$refs.ruleForm.resetFields();
                            // 类目修改成功，通知重新获取类目数据，重新渲染
                            this.$emit("getCategory");
                        }
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        cancel(e) {
            console.log("cancel");
            this.$emit("changeVisible", false);
        },
    },
};
</script>
