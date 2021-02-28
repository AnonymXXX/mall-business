<template>
    <div class="breadcrumb-wrap">
        <div class="path-directory">
            <a-breadcrumb>
                <a-breadcrumb-item>{{
                    $route.meta.title === "统计" ? "主页" : "商品管理"
                }}</a-breadcrumb-item>
                <a-breadcrumb-item>{{ $route.meta.title }}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="user-info">
            <a-popconfirm placement="bottomRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
                <template slot="title">
                    <p>是否退出登录</p>
                </template>
                <a-button
                    ><div>欢迎 {{ username }}<a-icon type="down" /></div
                ></a-button>
            </a-popconfirm>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["username"]),
    },
    methods: {
        confirm() {
            this.$store.commit("setUsername", "");
            document.cookie = `username=${this.username}; expires=-1`;
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="less" scoped>
.breadcrumb-wrap {
    position: relative;
    background: #fff;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .user-info {
        position: absolute;
        margin-right: 15px;
        right: 25px;
        top: 5px;
        z-index: 100;
        cursor: pointer;
        .anticon-down {
            margin-left: 3px;
            vertical-align: -3px;
        }
    }
}
</style>
