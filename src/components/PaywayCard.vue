<script>

export default {
    props: ["payway", "money"]
}
</script>

<template>
    <div v-if="payway == '1'" class="creaditcard">
        <h3>付款資訊</h3>
        <div class="numberbox">
            <label for="number">信用卡號碼 :</label>
            <input id="number" type="number">
        </div>
        <div class="addressbox">
            <label for="address">收件人地址 :</label>
            <input id="address" type="text">
        </div>

        <div class="day">
            <label for="date">有效年限 :</label>
            <input id="date" type="date" v-model="day">
        </div>


        <div class="codebox">
            <label for="csc">安全碼 :</label>

            <input id="csc" type="number">
        </div>
    </div>

    <div v-else-if="payway == '2'" class="atm">
        <div class="titlebox">
            <h3>付款總額 :</h3>
            <h3>NT$ :{{ money }}</h3>
        </div>

        <br>
        <p>中國信託銀行</p>
        <p>匯款帳戶 : </p>
        <p>1225200337037840</p>
        <p>請使用網路銀行或ATM進行轉帳</p>
    </div>

    <div v-else class="seven">
        <div class="titlebox">
            <h3>付款總額 :</h3>
            <h3>NT$ :{{ money }}</h3>
        </div>
        <div class="wordbox">
            <p>取貨時付款 </p>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.creaditcard,
.seven,
.atm {

    width: 33%;
    height: 100%;
    border-radius: 10px;
    border: 1px black solid;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    .titlebox {
        display: flex;
        width: 100%;
        justify-content: space-between;

        h3 {
            margin: 0;
            margin-right: 10px;
            margin-top: 10px;
        }
    }
    .wordbox{
        height: 50%;
    }
    h4,
    h3,
    label,p {
        font-weight: bold;

    }

    .numberbox,
    .addressbox,
    .codebox,
    .day {
        display: flex;
        align-items: center;

        input {
            background-color: #D9D9D9;
            border: none;
            border-radius: 10px;
        }

        h4,
        p {
            display: inline;
            margin: 0;
            margin-right: 10px;
        }
    }
}
</style>