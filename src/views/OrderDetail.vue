<script>
export default {
    data() {
        return {
            orderNumber: null,
            orderInfos: null,
            commodityList: [],
            commodityNumber: null,
            comAndQuantity: [],
            comInfo: [],
            total: 0,
            status: null,
            payWay: null,
            deliveryWay: null,
            accountBuy:null
        }
    },
    methods: {
        detail() {
            this.$router.push(`/my-market/orderview`)

        },
        getOrderNumber() {
            let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.orderNumber = str;
            let body = {
                orderNumber: str
            }
            fetch("http://localhost:8080/search_order_by_orderNumber", {
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
                    this.payWay = data.order.payWay;
                    this.deliveryWay = data.order.deliveryWay;
                    this.accountBuy = data.order.accountBuy;
                    let str = data.order.orderInfo;
                    this.status = data.order.status;
                    str = str.replace("{", "").replace("}", "").replaceAll('"', "");
                    str = str.split(",")
                    str.forEach(item => {
                        let test = item.split(":");
                        this.comAndQuantity.push({
                            number: test[0],
                            quantity: test[1]

                        })

                    })
                    this.comAndQuantity.forEach(i => {
                        console.log(i.number);
                        let body = {
                            number: i.number
                        }
                        console.log(body);
                        fetch("http://localhost:8080/search_com_by_number", {
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
                                this.comInfo.push({
                                    src : data.commodity.imgPath,
                                    number: data.commodity.number,
                                    name: data.commodity.name,
                                    price: data.commodity.price,
                                    quantity: i.quantity
                                })
                                this.total += (+data.commodity.price * +i.quantity)
                            })

                        console.log(this.comInfo);
                    })

                })
        },
        // 後端賣家沒有刪除的功能
        delOrder(number) {
            // 確認使用者是否要刪除
            const confirmation = `確定要刪除訂單編號${number}?`;

            // 使用 confirm 彈窗顯示確認訊息
            if (confirm(confirmation)) {
    
                const del = {
                    orderNumber: number
                };

                console.log(del)

                fetch("http://localhost:8080/delete_order_by_sale", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(del)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },



        getStatus(status) {
            switch (status) {
                case 0:
                    return "已取消";
                case 1:
                    return "已完成"
            }
        },

        getPayWay(payWay) {
            switch (payWay) {
                case 1:
                    return "信用卡支付";
                case 2:
                    return "ATM轉帳"
                case 3:
                    return "貨到付款"
            }
        },
        getDeliveryWay(deliveryWay) {

            switch (deliveryWay) {
                case 1:
                    return "宅配";
                case 2:
                    return "711取貨"
                case 3:
                    return "全家取貨"
            }
        }
    },
    mounted() {
        this.getOrderNumber();
    }






}
</script>

<template>
    <div class="order-detail">
        <div class="returnPage">
            <button type="button" @click="detail">返回訂單查詢</button>
        </div>
        <div class="firstSection">
            <table>
                <tr>
                    <th>訂單編號</th>
                    <th>{{ orderNumber }}</th>
                    <th>{{ getStatus(status) }}</th>
                    <th>
                        <button type="button" @click="delOrder(orderNumber)">訂單刪除</button>
                        <button type="button">訂單完成</button>
                    </th>
                </tr>
            </table>
        </div>
        <div class="list">
            <table>
                <tr>
                    <th>訂單內容</th>
                </tr>
                <tr class="listTitle">
                    <td></td>
                    <td>商品品名</td>
                    <td>商品數量</td>
                    <td>商品單價</td>
                </tr>
                <!-- <tr v-for="detailInfo in comInfo" :key="detailInfo.number">
                    <td>{{ detailInfo.name }}</td>
                    <td>{{ detailInfo.quantity }}</td>
                    <td>NT${{ detailInfo.price }}</td>
                </tr> -->
                <tr class="listvalue" v-for="(detailInfo,index) in comInfo" :key=index>
                    <td scope="row" class="imgbox">
                        <img v-bind:src="`../../pic/${detailInfo.src}.jpg`" alt="pic">
                    </td>
                    <td>{{ detailInfo.name }}</td>
                    <td>{{ detailInfo.quantity }}</td>
                    <td>NT${{ detailInfo.price }}</td>
                </tr>
                <tr class="money">
                    <td>總計</td>
                    <td>NT${{ total }}</td>
                </tr>
            </table>
        </div>
        <!-- <div class="receiveInfo">
            <table>
                <tr>
                    <th>收件人資訊</th>
                </tr>
                <tr>
                    <td>收件人</td>
                    <td>王小明</td>
                </tr>
                <tr>
                    <td>收件人電話</td>
                    <td>0912</td>
                </tr>
                <tr>
                    <td>收件人地址</td>
                    <td>高雄市</td>
                </tr>
            </table>
        </div> -->
        <div class="buyInfo">
            <table>
                <tr>
                    <th>買家資訊</th>
                </tr>
                <tr>
                    <td>買家帳號</td>
                    <td>{{accountBuy}}</td>
                </tr>
            </table>
        </div>
        <div class="way">
            <table>
                <tr>
                    <th>付款方式</th>
                    <td>{{ getPayWay(payWay) }}</td>
                </tr>
                <tr>
                    <th>配送方式</th>
                    <td>{{ getDeliveryWay(deliveryWay) }}</td>
                </tr>
            </table>
        </div>

    </div>
</template>

<style lang="scss" scoped>

.money{
    font-size: 20px;
    font-weight: bold;
}
.listvalue,
.listTitle{
    text-align: center;
    font-weight: bold;
}


.imgbox {
    width: 100px;
    height: 100px;
    margin-left: 10px;
    img {
        width: 100%;
        height: 100%;
    }
}
.returnPage,
.firstSection {
    margin: 20px;
}

.list,
// .receiveInfo,
.buyInfo,
.way {
    margin: 20px;
    border-radius: 10px;
    border: 1px solid black;
}

.list table {
    border-collapse: collapse;
    width: 100%;
}

// table {
//     border-collapse: collapse;
//     width: 100%;
// }

img {}

th,
td {
    // text-align: center;
    padding: 8px;
}

button {
    border: none;
    background-color: #403234;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 0 15px;
    border-radius: 10px;
    transition: 0.7s;
    cursor: pointer;
    margin: 0 20px;

    &:hover {
        background-color: #d0cfd0;
    }

    &:active {
        scale: 1.05;
    }
}
</style>