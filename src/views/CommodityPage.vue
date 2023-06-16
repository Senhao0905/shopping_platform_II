<script>
export default {
    props: ["number"],
    data() {
        return {
            comInfo: null
        }
    },
    mounted() {
        console.log("123")
        let body = {
            number: this.number
        }
        console.log(this.number)
        fetch("http://localhost:8080/search_com_by_number", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.comInfo = data.commodity;
                console.log(this.comInfo);

            })
    },
    methods: {
        inCar(number) {
            console.log(number);
            let quantity = document.getElementById("quantity").value;
            let body = {
                commodityNumber: number,
                quantity: quantity
            }
            console.log(body);

            fetch("http://localhost:8080/add_Commodity_ToCar", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.message == "Successful!!") {
                        alert("加入成功 ! ");
                        this.$router.push("/shopping-car/carview")
                    }
                    else if (data.message == "Inventory not enough !") {
                        alert("庫存量不足 ! ");
                    }
                    else {
                        alert("請先登入 ! ")
                        this.$router.push("/login")
                    }
                })
        }
    },
}
</script>

<template>
    <div class="title">
        <h3>商品分類:{{ comInfo === null ? "" : comInfo.category }}</h3>
    </div>
    <!-- 分上下兩層做 上面為商品資訊部分 -->

    <!-- 商品資訊部分  裡面再切分為 三個div-->
    <div class="upper-box">

        <!-- 1. img div -->
        <div class="img">
            <!-- src來源要改 -->
            <!-- pic\paomian.avif -->
            <img v-if="comInfo !== null" :src="`../../pic/${comInfo.imgPath}.jpg`" alt="">
        </div>
        <!-- 2. 商品資訊div -->
        <div class="info">
            <!-- 帶參數 -->
            <h2>{{ comInfo === null ? "" : comInfo.name }}</h2>
            <p>NT$ {{ comInfo === null ? "" : comInfo.price }}</p>
            <div class="qty-and-select">
                <span class="qty">數量</span>
                <br>
                <select name="" id="quantity" class="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <span class="inventory">庫存 {{ comInfo === null ? "" : comInfo.inventory }}</span>

            <br><br>
            <button v-if="comInfo !== null && +comInfo.inventory > 0" type="button"
                @click="inCar(comInfo.number)">加入購物車</button>

            <h2 v-else style="background-color:#E2C2B3 ;font-weight: bold;border-radius: 10px; text-align: center;">缺貨中</h2>

            <br><br><br>
            <p class="way">配送方式 : 超商取貨 一般取貨</p>
            <br>
            <p class="way">付款方式 : 信用卡 超商取貨 轉帳</p>
        </div>

        <div class="about">
            <h2>關於賣家</h2>
            <div class="d-flex align-items-center justify-content-sm-center ">
                <i class=" mx-1 fa-solid fa-star" style="color: #e48b8b;"></i>
                <p class="m-0 ">{{ comInfo === null ? "" : comInfo.accountSell }}的賣場</p>
            </div>

        </div>

    </div>
    <!-- 下面為商品介紹部分 -->
    <div class="under-box">
        <div class="title">
            <h2>商品介紹</h2>
        </div>
        <div class="intro">
            <p>{{ comInfo === null ? "" : comInfo.introduction }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.noBtn {
    button {
        background-color: red;
    }
}

.title {
    padding: 1.5rem 12rem 0.2rem 12rem;
    min-width: 1270px;

    h3 {
        font-size: 16px;
        font-weight: bold;
    }
}

.under-box {
    min-width: 1270px;
}

.intro {
    padding: 1.5rem 12rem 0.2rem 12rem;

}

.upper-box {
    display: flex;
    justify-content: center;
    min-width: 1270px;
}

.img {
    width: 300px;
    height: 300px;

    img {
        width: 100%;
        height: 100%;
    }

}


.info {
    padding: 0 6rem;


    button {
        padding: 5px 30px;
        font-weight: bold;
        background-color: #E2C2B3;
        border: 1px black solid;
        cursor: pointer;
        transition: 0.7s;
        border-radius: 10px;
        box-shadow: 0 10px 10px -5px;

        &:hover {
            background-color: #f0dfd7;
            scale: 1.05;
        }

        &:active {
            scale: 0.9;
        }
    }

    .form-select {
        width: 50px;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #FCF3F3;
    }

    .qty-and-select {
        display: flex;
        align-items: center;
    }


    .qty {
        padding: 0 2rem 0 0;
        margin: 0;
    }

    .way {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>