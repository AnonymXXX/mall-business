<template>
    <div class="card-wrapper">
        <a-card :title="title">
            <p>card content</p>
        </a-card>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: true,
            type: String,
        },
    },
};
</script>

<style lang="less" scoped>
.card-wrapper {
    flex: 1 1 auto;
    margin: 0 10px;
}
</style>
