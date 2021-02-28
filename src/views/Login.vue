<template>
    <a-form-model
        class="login-form"
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        v-bind="layout"
    >
        <a-form-model-item has-feedback label="邮箱" prop="email">
            <a-input
                v-model="loginForm.email"
                @focus="onFocus"
                @input="onInput"
                @blur="onBlur"
                type="email"
                autocomplete="off"
            />
            <AutoMail v-if="visible" width="280px" :mail="mail" @select="onSelect" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
            <a-input v-model="loginForm.password" type="password" autocomplete="off" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitForm('loginForm')">
                登录
            </a-button>
            <a-button style="margin-left: 15px" @click="resetForm('loginForm')">
                重置
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import service from "../services/index";
import AutoMail from "../components/AutoMail";

export default {
    components: {
        AutoMail,
    },
    data() {
        let ruleEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!value) {
                return callback(new Error("请输入邮箱"));
            }
            if (reg.test(value)) {
                return callback();
            }
            return callback(new Error("邮箱格式不正确"));
        };

        let rulePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        return {
            visible: false,
            mail: "",
            loginForm: {
                email: "1224543181@qq.com",
                password: "123456",
            },
            rules: {
                email: [{ validator: ruleEmail, trigger: "blur" }],
                password: [{ validator: rulePassword, trigger: "change" }],
            },
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
        };
    },
    methods: {
        onSelect(email) {
            this.loginForm.email = email;
        },
        onFocus({ target }) {
            const value = target.value.trim();
            if (value) {
                this.visible = true;
            }
        },
        onInput({ target }) {
            const value = target.value.trim();
            if (!value) {
                this.visible = false;
                return;
            }
            this.visible = true;
            const index = value.indexOf("@");
            if (index !== -1) {
                this.mail = value.substr(0, index);
            } else {
                this.mail = value;
            }
        },
        onBlur({ target }) {
            setTimeout(() => {
                if (this.visible) {
                    target.focus();
                    target.blur();
                    this.visible = false;
                }
            }, 150);
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const { email, password } = this.loginForm;
                    const { data, status, msg } = await service.login(email, password);
                    if (status === "success") {
                        const { username } = data;
                        this.$store.commit("setUsername", username);
                        this.$router.push("/");
                    } else {
                        this.$message.error(msg);
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style lang="css" scoped>
.login-form {
    position: fixed;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    border: 1px solid #eee;
    padding: 30px 0px 10px 20px;
}
</style>
