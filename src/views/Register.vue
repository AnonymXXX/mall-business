<template>
    <div class="register-page">
        <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item ref="username" label="Username" prop="username">
                <a-input
                    placeholder="please input your Username"
                    v-model="form.username"
                    @blur="
                        () => {
                            $refs.username.onFieldBlur();
                        }
                    "
                />
            </a-form-model-item>

            <a-form-model-item ref="password" label="Password" prop="password">
                <a-input
                    type="password"
                    placeholder="please input your Password"
                    v-model="form.password"
                    @blur="
                        () => {
                            $refs.password.onFieldBlur();
                        }
                    "
                />
            </a-form-model-item>

            <a-form-model-item ref="email" label="Email" prop="email">
                <a-input
                    style="width: 80%"
                    placeholder="please input your Email"
                    v-model="form.email"
                    @blur="
                        () => {
                            $refs.email.onFieldBlur();
                        }
                    "
                />
                <a-button
                    class="get-code"
                    type="primary"
                    :disabled="isLoading === true"
                    @click="getCode"
                >
                    {{ isLoading ? count + "s" : "code" }}
                </a-button>
            </a-form-model-item>

            <a-form-model-item ref="code" label="Verification Code" prop="code">
                <a-input
                    placeholder="please input your Verification Code"
                    v-model="form.code"
                    @blur="
                        () => {
                            $refs.code.onFieldBlur();
                        }
                    "
                />
            </a-form-model-item>

            <a-form-model-item label="Role" prop="role">
                <a-select v-model="form.role" placeholder="please select your Role">
                    <a-select-option value="customer">
                        customer
                    </a-select-option>
                    <a-select-option value="admin">
                        admin
                    </a-select-option>
                </a-select>
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                    Register
                </a-button>
                <a-button style="margin-left: 30px;" @click="login">
                    Login
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
import service from "../services/index";

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            isLoading: false,
            count: 60,
            timer: null,
            form: {
                username: "",
                email: "",
                password: "",
                code: "",
                role: "customer",
            },
            rules: {
                username: [
                    { required: true, message: "Please input your username", trigger: "blur" },
                    { min: 3, max: 8, message: "Length should be 3 to 8", trigger: "blur" },
                ],
                email: [
                    { required: true, message: "Please input your email", trigger: "blur" },
                    { pattern: /^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/ },
                ],
                password: [
                    { required: true, message: "Please input your password", trigger: "blur" },
                    { min: 6, max: 12, message: "Length should be 6 to 12", trigger: "blur" },
                ],
                code: [
                    {
                        required: true,
                        message: "Please input your Verification Code",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        onSubmit() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    const { username, email, password, code, role } = this.form;
                    const { status } = await service.register(
                        username,
                        email,
                        password,
                        code,
                        role
                    );
                    if (status === "success") {
                        alert("register success!");
                    } else {
                        alert(status);
                    }
                } else {
                    return false;
                }
            });
        },
        getCode() {
            const { email } = this.form;
            const reg = new RegExp(this.rules.email[1].pattern);
            if (!email.trim() || !reg.test(email.trim())) {
                this.$refs.email.onFieldBlur();
                return;
            }
            this.isLoading = true;
            this.timer = setInterval(() => {
                this.count--;
                if (this.count === 0) {
                    this.isLoading = false;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.count = 60;
                }
            }, 1000);
            service.getCode(email);
        },
        login() {
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="less" scoped>
.register-page {
    width: 100%;
    margin: 50px auto 50px;
    .ant-form {
        width: 100%;
        .ant-form-item {
            display: flex;
            justify-content: center;
            .get-code {
                box-sizing: border-box;
                width: 65px;
                margin-left: 20px;
            }
        }
    }
}
</style>
