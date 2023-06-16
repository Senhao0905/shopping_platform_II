<script>
export default{
    data() {
        return {
            // keyword : null,
            commodity:null
        }
    },

    mounted() {
        let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
         console.log(str);

        let body = {
            keyword: this.keyword,
        }
        fetch("http://localhost:8080/search_com_by_name_or_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.commodity = data.distinctSearchResponseList;
            
        })
      
    },
    props:["keyword"],
    methods :{
        comPage(comNumber){
            console.log(comNumber);
            this.$router.push({
                name: 'commodityPage',
                params: {
                    number: comNumber
                }
            })
        },
        reload(){
            location.reload();
        }
    }
}
</script>

<template>
    <div v-for="item in commodity" class="product-card" @change="reload">
        <div class="linkbox" @click="comPage(item.number)">
            <div class="imgbox">
                <img v-bind:src="`../../pic/${item.imgPath}.jpg`" alt="pic">
            </div>
            <div class="word-box">
                <h2>{{ item.name }}</h2>
            </div>
        </div>

        <div class="price-box">
            <p>{{ item.price }}元</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product-card {
    height: 300px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .price-box{
        width: 200px;
    }
    .linkbox {
        cursor: pointer;
        .word-box {
            width: 200px;
            h2{
                font-weight: bold;
            }
        }

        .imgbox {
            cursor: pointer;
            width: 200px;
            height: 200px;
            background-color: black;
            img{
                width: 100%;
                height: 100%;
            }
        }

    }

    h2 {
        font-size: 24px;
    }
}
</style>