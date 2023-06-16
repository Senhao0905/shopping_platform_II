<script>
import ProductCard from "../components/ProductCard.vue"
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"
export default {
    components: {
        ProductCard
    },
    data() {
        return {
            category : "休閒用品"
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(504);
        
    }
}
</script>

<template>
    <h2>休閒用品</h2>
    <div class="product">
        
        <ProductCard :category="category" />

        <!-- 下面這些用上面這個 v-for產生 -->
    </div>
</template>

<style lang="scss" scoped>
.product {
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-template-rows: auto;

    .test {
        height: 300px;
        background-color: red;
        margin: 5px;
    }
}
</style>