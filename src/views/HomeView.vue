<script>
import { mapActions } from "pinia";
import indexStore from "../stores/indexStore"
export default {

    data() {
        return {
            topFour: null
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"]),
        comPage(comNumber) {
            console.log(comNumber);
            this.$router.push({
                name: 'commodityPage',
                params: {
                    number: comNumber
                }
            })
        }

    },
    mounted() {
        this.updateLocation(0);

        fetch("http://localhost:8080/get_4_commodity", {
            credentials: 'include',
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.topFour = data.commodityList
                console.log(this.topFour);

            })

    }
}
</script>

<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../pic/test.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../pic/test2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../pic/test3.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    
    <div class="title-box">
        <h2>熱賣商品</h2>
    </div>
    <div class="top-product">


        <div v-for="item in topFour" class="product-card">

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

    </div>
</template>

<style lang="scss" scoped>
#carouselExampleIndicators {
    width: 100%;
   margin: 1.5rem 0;
}

.carousel-item {
    img {
        height: 500px;
    }
}

.top-product {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .product-card {
        height: 300px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .price-box {
            width: 200px;
        }

        .linkbox {
            cursor: pointer;

            .word-box {
                width: 200px;

                h2 {
                    font-weight: bold;
                }
            }

            .imgbox {
                cursor: pointer;
                width: 200px;
                height: 200px;
                background-color: black;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

        }

        h2 {
            font-size: 24px;
        }
    }
}

.title-box {
    text-align: center;
    font-size: 24px;
    margin-top: 16px;
}</style>