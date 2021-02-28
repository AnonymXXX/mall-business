<template>
    <div class="home">
        <MenuList />
        <div class="prod-wrap">
            <Breadcrumb />
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import MenuList from "@/components/MenuList";
import Breadcrumb from "@/components/Breadcrumb";

export default {
    components: {
        MenuList,
        Breadcrumb,
    },
};
</script>

<style lang="less" scoped>
.home {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    .prod-wrap {
        width: 100%;
        height: 100%;
        padding-left: 180px;
        box-sizing: border-box;
        min-width: 1000px;
    }
}
</style>
