<template>
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
        <a-form-model-item ref="price" label="商品售价" prop="price">
            <a-input
                v-model="form.price"
                @blur="
                    () => {
                        $refs.price.onFieldBlur();
                    }
                "
            />
        </a-form-model-item>

        <a-form-model-item ref="price_off" label="商品折扣价" prop="price_off">
            <a-input
                v-model="form.price_off"
                @blur="
                    () => {
                        $refs.price_off.onFieldBlur();
                    }
                "
            />
        </a-form-model-item>

        <a-form-model-item ref="inventory" label="购买上限" prop="inventory">
            <a-input
                v-model="form.inventory"
                @blur="
                    () => {
                        $refs.inventory.onFieldBlur();
                    }
                "
            />
        </a-form-model-item>

        <a-form-model-item ref="unit" label="计量单位" prop="unit">
            <a-input
                v-model="form.unit"
                @blur="
                    () => {
                        $refs.unit.onFieldBlur();
                    }
                "
            />
        </a-form-model-item>

        <a-form-model-item label="商品图片" :style="{ marginBottom: '0px' }">
            <a-upload
                :actiom="uploadUrl"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
            >
                <div v-if="fileList.length < 8">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                        Upload
                    </div>
                </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </a-form-model-item>

        <a-form-model-item label=" " :colon="false">
            <label for="is-sell" :style="{ cursor: 'pointer', color: '#000000D9' }">
                是否上架：
                <a-checkbox @change="onChange" :status="form.status" id="is-sell" />
            </label>

            <a-button type="primary" :style="{ marginLeft: '50px' }" @click="onPrev">
                上一步
            </a-button>

            <a-button type="primary" :style="{ marginLeft: '30px' }" @click="onSubmit">
                完成
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { mapState } from "vuex";
import service from "../services/index";
import URLS, { baseURL, appkey } from "../services/URLS";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default {
    props: ["form1"],
    computed: {
        uploadUrl() {
            return `${baseURL}${URLS.upload}?appkey=${appkey}`;
        },
    },
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                price: "",
                price_off: "",
                inventory: null,
                unit: "",
                tags: [],
                status: false,
            },
            rules: {
                price: [
                    { required: true, message: "Please input your sale price", trigger: "blur" },
                ],
                price_off: [
                    {
                        required: true,
                        message: "Please input your discount price",
                        trigger: "blur",
                    },
                ],
                inventory: [
                    { required: true, message: "Please input your inventory", trigger: "blur" },
                ],
                unit: [{ required: true, message: "Please input your unit", trigger: "blur" }],
            },
            previewVisible: false,
            previewImage: "",
            fileList: [],
        };
    },
    methods: {
        onPrev() {
            this.$store.commit("changeStep", 0);
        },
        onSubmit() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    const { title, desc, category, c_items, tags } = this.form1;
                    let { price, price_off, unit, status, inventory } = this.form;
                    const images = this.fileList;

                    if (status) {
                        status = 1;
                    } else {
                        status = 0;
                    }
                    const data = await service.addGoods(
                        title,
                        category,
                        tags,
                        price,
                        price_off,
                        unit,
                        status,
                        inventory,
                        desc,
                        c_items
                    );
                    this.$store.commit("changeStep", 2);
                    if (data.status === "success") {
                        this.$notification.success({
                            message: "添加成功",
                            duration: 2.5,
                        });
                        this.$router.push("/productList");
                    } else {
                        this.$message.error("添加失败");
                    }
                    this.$store.commit("changeStep", 0);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        onChange() {
            this.form.status = !this.form.status;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
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
