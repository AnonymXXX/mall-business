<template>
    <ul :style="{ width }">
        <li v-for="postfix in postfixArr" :key="postfix" @click="handleClick(mail + postfix)">
            {{ mail + postfix }}
        </li>
    </ul>
</template>

<script>
// 补全邮箱后缀
export default {
    data() {
        return {
            i: 0,
            postfixArr: [
                "@qq.com",
                "@163.com",
                "@126.com",
                "@sina.com",
                "@sohu.com",
            ],
        };
    },
    props: ["width", "mail"],
    methods: {
        handleClick(email) {
            this.$emit("select", email);
        },
    },
};
</script>

<style scoped>
ul {
    border-radius: 5px;
    position: fixed;
    z-index: 999;
    padding: 0px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 12px #ccc;
}
ul li {
    text-align: center;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
}

ul li:first-child {
    border: none;
}
ul li:hover {
    background: #d0e2f9;
}
</style>
