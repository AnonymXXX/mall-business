<template>
    <div class="add-list">
        <Steps />
        <div v-if="isLoading !== true">
            <GoodsBaseInfo v-show="step === 0" :form="form" />
            <GoodsSaleInfo v-show="step === 1" :form1="form" />
        </div>

        <Loading v-else />
    </div>
</template>

<script>
import { mapState } from "vuex";
import Steps from "./Steps";
import GoodsBaseInfo from "./GoodsBaseInfo";
import GoodsSaleInfo from "./GoodsSaleInfo";
import Loading from "./Loading";

export default {
    data() {
        return {
            form: {
                title: "",
                c_items: "",
                tags: [],
                categoryArr: [],
            },
        };
    },
    computed: {
        ...mapState(["step", "isLoading"]),
    },
    components: {
        Steps,
        GoodsBaseInfo,
        GoodsSaleInfo,
        Loading,
    },
    created() {
        this.$store.commit("setIsLoading", true);
        this.$store.commit("changeStep", 0);
        // 延迟用于测试
        setTimeout(() => {
            this.$store.commit("setIsLoading", false);
        }, 300);
    },
};
</script>
