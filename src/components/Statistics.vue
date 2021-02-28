<template>
    <div class="statistics">
        <div v-if="isLoading !== true">
            <CardList />
            <LineChart />
        </div>
        <Loading v-else />
    </div>
</template>

<script>
import { mapState } from "vuex";
import CardList from "./CardList";
import LineChart from "./LineChart";
import Loading from "./Loading";

export default {
    components: {
        CardList,
        LineChart,
        Loading,
    },
    computed: {
        ...mapState(["isLoading"]),
    },
    created() {
        this.$store.commit("setIsLoading", true);
        // 延迟用于测试
        setTimeout(() => {
            this.$store.commit("setIsLoading", false);
        }, 300);
    },
};
</script>
