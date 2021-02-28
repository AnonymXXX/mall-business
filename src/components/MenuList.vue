<template>
    <!-- 菜单列表 -->
    <div class="menu-list-wrapper">
        <a-menu
            :default-selected-keys="['1']"
            :defaultOpenKeys="['sub1', 'sub2']"
            mode="inline"
            :selectedKeys="[$route.meta.key]"
        >
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="home" /><span>主页</span></span>
                <a-menu-item key="1">
                    <router-link to="/statistics">
                        <a-icon type="global" />
                        统计
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="shopping" /><span>商品管理</span></span>
                <a-menu-item key="2">
                    <router-link to="/productList">
                        <a-icon type="unordered-list" />
                        商品列表
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/productAdd">
                        <a-icon type="file-add" />
                        添加商品
                    </router-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <router-link to="/productCategory">
                        <a-icon type="form" />
                        修改类目
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<style lang="less" scoped>
.menu-list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 180px;
    height: 100%;
    .ant-menu {
        height: 100%;
    }
}
</style>
