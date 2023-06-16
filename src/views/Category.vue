<script>
import FunctionSelect from '../components/FunctionSelect.vue';
import { RouterView } from 'vue-router';
export default {
    data() {
        return {
            title: "商品分類",
            member: [
                {
                    index:501,
                    name: "3C產品",
                    to: "/category/computer"
                },
                {
                    index:502,
                    name: "配件飾品",
                    to: "/category/accessories"
                },
                {
                    index:503,
                    name: "居家生活",
                    to: "/category/life"
                },
                {
                    index:504,
                    name: "休閒用品",
                    to: "/category/casual"
                },
                {
                    index:505,
                    name: "美食廣場",
                    to: "/category/food"
                }
            ]
        }
    },
    components : {
        FunctionSelect
    }
}
</script>

<template>
    <div class="category-group">
        <FunctionSelect :title="title" :member="member"/>
        <div class="category-box">
            <RouterView />
        </div>
    </div>

</template>

<style lang="scss" scoped>

.category-group{
    display: flex;
}
</style>