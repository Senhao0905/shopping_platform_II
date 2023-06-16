<script>
import FunctionSelect from '../components/FunctionSelect.vue';
import SearchCard from "../components/SearchCard.vue"

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
            ],
            inputText: null,
            keyword:null
        }
    },
    components : {
        FunctionSelect,
        SearchCard
    },

    props:["keyword"],
    mounted(){
        // console.log(this.keyword);
    },
    methods:{
        
    },
    beforeUpdate(){
        location.reload();
    }
     
    
}
</script>

<template>
    <h2 >搜尋結果:{{ keyword }}</h2>
    <div class="category-group">
        <FunctionSelect :title="title" :member="member"/>
        
        <div class="category-box">
            
            <SearchCard :keyword="keyword" />
         
        </div>
    </div>

</template>

<style lang="scss" scoped>

.category-group{
    display: flex;
}
.category-box{
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-template-rows: auto;
}
h2{
    margin: 0 12rem;
    font-size: 28px;
}
</style>