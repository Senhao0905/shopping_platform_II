<script>
import { mapActions } from "pinia";
import indexStore from "../stores/indexStore"
export default {
    data() {
        return {
            shopCarList: null,
            moneySum: 0,
            selectItem: [],
            money: 0,
            prop: null,
            src: null
        }
    },
    mounted() {

        fetch("http://localhost:8080/get_shopping_car_info", {
            credentials: 'include',
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.shopCarList = data.getCommodityInfoList;

                this.shopCarList.forEach(item => {
                    this.moneySum += (+item.price * item.quantity);
                    item.src = `../../pic/${item.imgPath}.jpg`
                })
                console.log(this.shopCarList);
                console.log(this.moneySum);
            })
        this.updateLocation(300);
    },
    methods: {
        test(name, number) {
            console.log(this.selectItem);
            let dom = document.getElementById(`${number}`);
            let quantity = +dom.value;

            if (!this.selectItem.includes(name)) {
                this.shopCarList.forEach(i => {
                    if (name === i.name) {
                        this.money = this.money - (+i.price * quantity);
                        console.log(this.money);
                    }
                })
                return;
            }
            this.shopCarList.forEach(i => {
                if (name === i.name) {
                    this.money = this.money + (+i.price * quantity);
                    console.log(this.money);
                }
            })
        },
        test2(name, number) {
            let dom = document.getElementById(`${number}`);
            let checked = document.getElementById(`${name}`).checked;
            console.log(checked);
            let quantity = +dom.value;
            this.moneySum = 0;
            this.shopCarList.forEach(item => {
                if (item.commodityNumber === number) {
                    if (checked) {
                        let cut = quantity - item.quantity;
                        let cutMoney = +item.price * cut;
                        this.money += cutMoney;
                        item.quantity = quantity;
                    }
                    else {
                        item.quantity = quantity;
                    }
                }
                this.moneySum += (+item.price * item.quantity);
            })
            console.log(this.moneySum);
        },
        del(name, number, price) {
            console.log(name);
            console.log(number)
            const quantity = document.getElementById(number).value;
            console.log(quantity);

            console.log(this.shopCarList);
            let body = {
                commodityNumber: number
            }
            fetch("http://localhost:8080/dele_Commodity_FromCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.message == "Successful!!") {
                        this.selectItem.forEach(item => {
                            if (item == name) {
                                this.money -= (+price * quantity);
                            }
                        })

                        this.shopCarList = this.shopCarList.filter(item => {
                            return item.name !== name;
                        })
                    }
                })
        },
        checkout() {
            let comNumber = [];
            this.shopCarList.forEach(i => {
                this.selectItem.forEach(item => {
                    if (i.name == item) {
                        comNumber.push({
                            name: item,
                            commodityNumber: i.commodityNumber
                        })
                    }
                })
            })

            console.log(comNumber);
            if (comNumber.length == 0) {
                console.log("沒點選");
                alert("沒有點選商品!")
                return;
            }
            let resStr = [];

            comNumber.forEach(i => {
                let dom = document.getElementById(`${i.commodityNumber}`);
                let quantity = dom.value;
                resStr.push(i.name + "-" + quantity);
                console.log(resStr);
            })

            this.prop = resStr.toString();
            this.$router.push({
                name: 'checkout',
                params: {
                    propText: this.prop
                }
            })
        },
        ...mapActions(indexStore, ["updateLocation"])

    }
}
</script>

<template>
    <div class="shop-car">
        <div class="title">
            <h2>購物車</h2>
        </div>
        <div class="shop-item">
            <div class="product-box">
                <div class="product" v-for="(item, index) in shopCarList">
                    <div class="squarebox">
                        <input type="checkbox" v-bind:id="item.name" v-bind:value="item.name" v-model="selectItem"
                            @change="test(item.name, item.commodityNumber)">
                    </div>
                    <div class="produt-info">
                        <div class="imgbox">
                            <img v-bind:src="item.src" alt="pic">
                        </div>
                        <div class="infogroup">
                            <div class="infobox">
                                <h2>商品</h2>
                                <h2>{{ item.name }}</h2>
                                <!-- @change="test2(item.name, item.commodityNumber)" -->
                                <input :id="item.commodityNumber" type="number" v-bind:value="item.quantity"
                                    @change="test2(item.name, item.commodityNumber)">
                                <p>${{ item.price }}</p>
                            </div>
                        </div>

                        <div class="cancel">
                            <i class="fa-solid fa-xmark" @click="del(item.name, item.commodityNumber, item.price)"></i>
                        </div>

                    </div>
                </div>

            </div>

            <div class="money-box">
                <div class="money">

                    <div class="money-title">
                        <h2>訂單摘要</h2>
                    </div>

                    <div class="money-sum">
                        <h2>商品金額</h2>
                        <h2>NT: {{ money }} </h2>
                    </div>

                    <div class="money-total">
                        <h2>結帳金額</h2>
                        <h2>NT: {{ money }} </h2>

                    </div>

                    <div class="btn">
                        <button type="button" @click="checkout">來去結帳</button>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>


<style lang="scss" scoped>
.shop-car {
    min-width: 1270px;

    .shop-item {
        display: flex;
        height: 90%;
    }

    width: 100%;
    height: 100%;

    .title {
        height: 10%;

        h2 {
            padding: 10px;
            font-weight: bold;
        }
    }

    .product-box {
        width: 50%;
        overflow: auto;

        .product {
            width: 80%;
            height: 200px;
            margin: 5px auto;
            border: 2px black solid;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .squarebox {
                width: 80%;

                .square {
                    width: 50px;
                    height: 50px;
                    background-color: gray;
                }
            }


            .produt-info {
                width: 85%;
                height: 70%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .imgbox {
                    width: 120px;
                    height: 120px;
                    margin-left: 20px;
                    background-color: aqua;

                    img {
                        width: 100%;
                        height: 100%;

                    }
                }

                .selectgroup {
                    select {
                        margin: 0;
                        margin-right: 5px;
                        width: 50px;

                        padding: 0;
                    }
                }

                .infobox {
                    display: flex;
                    align-items: center;

                    input {
                        width: 50px;
                    }

                    // justify-content: start;
                    h2,
                    p {
                        width: 50px;
                        font-size: 16px;
                        font-weight: bold;
                        margin: 0;
                        text-align: center;
                    }



                    .form-select {
                        width: 50px;
                        margin: 0;
                        padding: 0;
                        background-color: #FCF3F3;
                    }

                }

                .cancel {
                    margin-right: 10px;

                    i {
                        cursor: pointer;

                    }
                }
            }
        }
    }

    .money-box {
        width: 50%;

        .money {
            width: 400px;
            height: 400px;
            top: 50;
            right: 200px;
            margin: 0 auto;


            .btn {
                margin-top: 50px;
                width: 100%;
                border: none;

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
            }

            .money-title {
                h2 {
                    padding-left: 10px;
                    font-size: 25px;
                    font-weight: bold;
                }

                width: 70%;
                background-color: #E2C2B3;
                border-radius: 50px;
            }

            .money-sum,
            .money-total {
                display: flex;
                justify-content: start;

                h2 {
                    font-size: 25px;
                    font-weight: bold;
                    margin: 10px 20px;
                }
            }
        }
    }
}</style>