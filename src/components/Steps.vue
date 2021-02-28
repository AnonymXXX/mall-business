<template>
    <a-steps :current="step" size="default">
        <a-step title="填写商品基本信息" />
        <a-step title="填写商品销售信息" />
    </a-steps>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["step"]),
    },
};
</script>

<style lang="less" scoped>
.ant-steps {
    width: 600px;
    margin: 20px auto;
    min-width: 600px;
}
</style>
