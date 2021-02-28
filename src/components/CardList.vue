<template>
    <div class="card-list">
        <Card v-for="item in cardList" :key="item" :title="item" />
    </div>
</template>

<script>
import Card from "./Card";
export default {
    data() {
        return {
            cardList: ["商品总览", "用户总览", "销售总览"],
        };
    },
    components: {
        Card,
    },
};
</script>

<style scoped>
.card-list {
    background-color: rgb(236, 236, 236);
    padding: 20px 10px 20px;
    display: flex;
    justify-content: space-between;
}
</style>
