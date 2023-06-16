<script>
export default {
    data() {
        return {
            orderInfos: [],
            orderId: null

        }
    },
    methods: {
        detail(test) {
            this.$router.push(`/my-market/orderDetail?${test}`)

        },
        detailBuy(number) {
            this.$router.push(`/member-center/orderDetailUser?${number}`)
        },
        getAccountBuy() {
            fetch("http://localhost:8080/search_order_by_account_buy", {
                credentials: 'include',
                method: "POST",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.orderInfos = data.orderInfos;
                })
        },
        getAccountSale() {
            fetch("http://localhost:8080/search_order_by_account_sale", {
                credentials: 'include',
                method: "POST",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.orderInfos = data.orderInfos;
                })
        },
        getPayWay(payway) {
            switch (payway) {
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
        },
        getStatus(status) {
            switch (status) {
                case 1:
                    return "已完成";
                case 0:
                    return "已取消"
            }
        }



    },
    mounted() {
        if (this.buy == "buy") {
            this.getAccountBuy();
        }
        else {
            this.getAccountSale()
        }
    },
    props: ["buy"]
}
</script>

<template>
    <div class="list">
        <table>
            <tr>
                <th>訂單編號</th>
                <th>訂單狀態</th>
                <th>配送方式</th>
                <th v-if="buy == 'buy'">付款方式</th>
                <th v-else>買家編號</th>
            </tr>
            <tr v-for="orderInfo in orderInfos" :key="orderInfo.orderNumber">
                <td>{{ orderInfo.orderNumber }}</td>
                <td>{{ getStatus(orderInfo.status) }}</td>
                <td>{{ getDeliveryWay(orderInfo.deliveryWay) }}</td>
                <td v-if="buy == 'buy'">{{ getPayWay(orderInfo.payWay) }}</td>
                <td v-else>{{ orderInfo.accountBuy }}</td>
                <td>
                    <button v-if="buy == 'buy'" type="button" @click="detailBuy(orderInfo.orderNumber)">訂單詳情</button>
                    <button v-else type="button" @click="detail(orderInfo.orderNumber)">訂單詳情</button>
                </td>

            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.list {
    margin: 80px;
    border-radius: 10px;
    border: 1px solid black;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: center;
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