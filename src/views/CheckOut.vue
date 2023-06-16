<script>
import PaywayCard from "../components/PaywayCard.vue"
export default {
    data() {
        return {
            comInfo: [],
            checkoutInfo: [],
            payway: "1",
            day: null,
            money: 0
        }
    },
    components: {
        PaywayCard
    },
    mounted() {
        this.getCom(this.propText)
    },
    methods: {
        getCom(text) {
            console.log(text)
            let list = text.split(',');
            list.forEach(i => {
                let str = i.split('-');
                this.comInfo.push({
                    name: str[0],
                    quantity: str[1]
                })
            })
            console.log(this.comInfo);

            this.comInfo.forEach(i => {
                let body = {
                    name: i.name
                }
                console.log(body);
                fetch("http://localhost:8080/search_com_by_name", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        this.checkoutInfo.push({
                            src: data.commodityList[0].imgPath,
                            number: data.commodityList[0].number,
                            name: data.commodityList[0].name,
                            price: data.commodityList[0].price,
                            quantity: i.quantity,
                            total: (+data.commodityList[0].price * +i.quantity)
                        })

                        this.money += (+data.commodityList[0].price * +i.quantity);
                    })

                console.log(this.checkoutInfo);
            })
        },
        order() {
            let dom = document.getElementById("payway");
            console.log(dom.value);
            let orderInfo = {};
            console.log(typeof this.checkoutInfo);
            this.checkoutInfo.forEach(i => {
                orderInfo[i.number] = i.quantity
            })
            console.log(orderInfo);
            let body = {
                "orderInfo": orderInfo,
                "payWay": this.payway,
                "deliveryWay": dom.value
            }

            console.log(body);

            fetch("http://localhost:8080/add_order", {
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
                    if (data.message == "200") {
                        console.log(this.checkoutInfo);
                        this.checkoutInfo.forEach(item => {
                            let body = {
                                "commodityNumber": item.number
                            }
                            console.log(body);
                            fetch("http://localhost:8080/dele_Commodity_FromCart", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",

                                },
                                body: JSON.stringify(body),
                                credentials: "include"
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                        })
                        alert("下單成功")
                        location.href = "/"

                    }
                    else {
                        alert("下單失敗")
                        location.href = "/shopping-car/carview"
                    }
                })
        },

    },
    props: ["propText"]
}
</script>

<template>
    <div class="checloutbox">
        <div class="btnbox">
            <button type="button" @click="this.$router.push('/shopping-car/carview')">返回購物車</button>
        </div>
        <div class="checkinfobox">
            <table id="showData" class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <p class="m-0">訂單商品</p>
                        </th>
                        <th scope="col">
                            <p class="m-0">品名</p>
                        </th>
                        <th scope="col">
                            <p class="m-0">單價</p>
                        </th>
                        <th scope="col">
                            <p class="m-0">數量</p>
                        </th>
                        <th scope="col">
                            <p class="m-0">總價</p>
                        </th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr v-for="item in checkoutInfo" class="itembox">
                        <th scope="row" class="imgbox">
                            <img v-bind:src="`../../pic/${item.src}.jpg`" alt="pic">
                        </th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ +item.price * +item.quantity }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="paywaybox">
            <div class="payway">
                <h3>選擇付款方式</h3>
                <div class="credit">
                    <input type="radio" name="payway" id="creditcard" value="1" v-model="payway">
                    <label for="creditcard">
                        信用卡
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                    </label>

                </div>
                <div class="atm">
                    <input type="radio" name="payway" id="atm" value="2" v-model="payway">
                    <label for="atm">
                        ATM轉帳
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </label>

                </div>
                <div class="money">
                    <input type="radio" name="payway" id="取貨付款" value="3" v-model="payway">
                    <label for="取貨付款">
                        取貨付款
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                    </label>
                </div>
            </div>

            <PaywayCard :payway="payway" :money="money" />

            <div class="diliveyway">
                <h3>結帳總金額 : {{ money }}</h3>
                <div class="dilivery">
                    <label for="dilivery">運送方式 :</label>
                    <select id="payway" aria-label="Default select example">
                        <option value="1">宅配</option>
                        <option value="2">711超取</option>
                        <option value="3">全家超取</option>
                    </select>

                </div>

                <div class="paywaytitle">
                    <label for="payway" v-if="payway == 1">付款方式 : 信用卡</label>
                    <label for="payway" v-else-if="payway == 2">付款方式 : ATM轉帳</label>
                    <label for="payway" v-else>付款方式 : 取貨付款</label>
                </div>
                <div class="btnbox1">
                    <button type="button" @click="order">確認付款</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.credit,
.atm,
.money {
    label,
    i {
        font-size: 20px;
        margin: 0 10px;
        cursor: pointer;
        transition: 0.7s;
        padding: 0 10px;
        &:hover{
            background-color: #f5ded4;
            border-radius: 10px;
            
            font-weight: bold;
        }
    }
}

.checloutbox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btnbox {
        margin-top: 10px;
        width: 90%;
        background-color: white;
        margin-bottom: 20px;

        button {
            background-color: #FAD5C4;
            color: black;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.9s;
            padding: 5px 20px;

            &:hover {
                background-color: #f3b193;
                scale: 1.05;
            }

            &:active {
                scale: 0.9;
            }
        }
    }

    .checkinfobox {
        width: 90%;
        height: 45%;
        border: black 1px solid;
        border-radius: 5px;
        overflow: auto;
        font-weight: bold;

        .table {
            text-align: center;
            width: 80%;
            margin: 0 auto;

            .imgbox {
                width: 100px;
                height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .itembox {
                margin: 10px 0;

            }


        }
    }

    .paywaybox {
        width: 90%;
        height: 45%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .payway {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: space-around;
            font-weight: bold;
            border-radius: 10px;

            h3 {
                font-weight: bold;
            }

            label {
                font-size: 24px;

            }

        }

        .userunfo {
            width: 33%;
            height: 100%;
            background-color: #C5BABA;
            border-radius: 10px;
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;

            h4,
            h3 {
                font-weight: bold;
            }

            .numberbox,
            .addressbox,
            .codebox,
            .day {
                margin: 10px 0;
                display: flex;
                align-items: center;

                input {
                    background-color: #D9D9D9;
                    border: none;
                    border-radius: 10px;
                }

                h4 {
                    display: inline;
                    margin: 0;
                    margin-right: 10px;
                }
            }
        }

        .diliveyway {
            width: 33%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            font-weight: bold;

            label {
                margin: 0 10px;
            }

            .btnbox1 {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                button {
                    font-size: 20px;
                    font-weight: bold;
                    padding: 0 50px;
                    background-color: #FAD5C4;
                    cursor: pointer;
                    transition: 0.7s;
                    border: none;
                    border-radius: 10px;

                    &:hover {
                        background-color: #f0ab8b;
                        scale: 1.05;
                    }

                    &:active {
                        scale: 0.7;
                    }
                }
            }

            h3 {
                font-weight: bold;
                margin-top: 10px;
            }
        }
    }
}
</style>