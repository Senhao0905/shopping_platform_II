<script>
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"
export default {
    data() {
        return {
            commodityList: [],
            number: 0
        }
    },
    methods: {
        detail() {
            this.$router.push(`/my-market/orderview`)
        },
        editComPage(test) {
            this.$router.push(`/my-market/CommodityEdit/?${test}`)

        },
        commodityPage(text) {
            this.$router.push(`/my-market/CommodityEdit`)
        },
        addCommodity() {
            this.$router.push(`/my-market/AddCommodity`)
        },

        // 刪除商品
        delCom(number) {
            // 確認使用者是否要刪除
            const confirmation = `確定要刪除商品編號${number}?`;

            // 使用 confirm 彈窗顯示確認訊息
            if (confirm(confirmation)) {
                // 建立更新資料的物件
                const del = {
                    commodityNumber: number,
                };

                fetch("http://localhost:8080/delete_commodity", {
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
            location.href = "/my-market/commodity"
        },

        ...mapActions(indexStore, ["updateLocation"])


    },
    mounted() {

        fetch("http://localhost:8080/find_CommodityForManage", {
            credentials: 'include',
            method: "POST",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.commodityList = data.commodityList;

            }),
            this.updateLocation(102);

    },
    beforeUpdate(){
        this.updateLocation(102);
    }
}

</script>

<template>
    <div>
        <div class="list">
            <div class="addBtn">
                <button type="button" @click="detail">返回訂單查詢</button>
                <button type="button" @click="addCommodity">新增商品</button>
            </div>

            <table>
                <tr>
                    <th>商品編號</th>
                    <th>商品品名</th>
                    <th>分類</th>
                    <th>單價</th>
                    <th>庫存量</th>
                    <th></th>

                </tr>
                <tr v-for="(comodityInfo, index) in commodityList" :key=index>
                    <td>{{ comodityInfo.number }}</td>
                    <td>{{ comodityInfo.name }}</td>
                    <td>{{ comodityInfo.category }}</td>
                    <td>NT${{ comodityInfo.price }}</td>
                    <td>{{ comodityInfo.inventory }}</td>
                    <td>
                        <button type="button" @click="editComPage(comodityInfo.number)">編輯</button>
                        <button type="button" @click="delCom(comodityInfo.number)">刪除</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.addBtn{
    width: 100%;
   display: flex;
   justify-content: space-between;
}
.list {
    margin: 80px;
    border-radius: 10px;
    border: 1px solid black;
    padding: 10PX;
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