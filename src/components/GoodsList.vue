<template>
    <div class="goods-list">
        <GoodsSearch />
        <GoodsTable />
    </div>
</template>

<script>
import GoodsSearch from "./GoodsSearch";
import GoodsTable from "./GoodsTable";

export default {
    components: {
        GoodsSearch,
        GoodsTable,
    },
};
</script>

<style lang="less" scoped>
.goods-list {
    position: relative;
    width: 100%;
    height: 92%;
    background: #fff;
    overflow-x: scroll;
    overflow-y: hidden;
}
</style>
