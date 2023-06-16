<script>
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"
import Info from "../components/LoginMessage.vue";
export default {
    components: {
        Info
    },

    data() {

        return {
            account: null,
            pwd: null,
            isLogin: false,
        }
    },
    mounted(){
        this.updateLocation(400);
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"]),
        login() {

            const body = {
                "account": this.account,
                "pwd": this.pwd,
            }

            console.log(body);

            fetch("http://localhost:8080/login", {

                method: "POST",
                headers: {
                    // 設置成json格式
                    'Content-Type': 'application/json',
                },

                // 將 JS值或對象轉換為: JSON 字符串
                body: JSON.stringify(body),

                // 確實取得Jsession: Http Session通訊用
                credentials: 'include'

            })

                .then(function (response) {
                    // if(!response.ok){
                    //     throw new Error('Error accrued: ' + response.status);
                    // }

                    return response.json();
                })

                // 檢查後臺程式: Response的data裡message項目要是沒有"successful"
                // 的結果就報錯並結束流程
                .then((data) => {

                    if (data.message !== "Successful!!") {

                        alert("登入資料錯誤!");
                        console.log(data);
                        return;
                    }
                    console.log(data);
                    this.isLogin = !this.isLogin;
                    sessionStorage.setItem("isLogin",true);
                    sessionStorage.setItem("account",data.user.account)
                })

        }

    }
}

</script>


<template>
    <div class="main">

        <div class="logo">
            <div class="imgbox">
                <img src="../../pic/Dobby-removebg.jpg" alt="">
            </div>
        </div>

        <div class="cube">

            <div class="in-cube">
                <h1>會員登錄</h1>

                <span class="account">
                    <p>帳號
                        <input type="text" class="account-input" v-model="account">
                    </p>
                </span>
                <span class="pwd">
                    <p>密碼
                        <input type="password" class="pwd-input" v-model="pwd">
                    </p>
                </span>

                <div class="btn-area">
                    <div class="login">
                        <button type="button" @click="login">登入</button>
                    </div>

                    <Info v-if="isLogin" @outsideWindows="login">
                    </Info>

                    <div class="register">

                        <RouterLink to="/register">
                            <!-- <button type="button" RouterLink to="/register">註冊</button> -->
                            <a href="/register">註冊</a>
                        </RouterLink>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    display: flex;
}

.logo {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: end;
    align-items: center;

    .imgbox {
        width: 500px;
        height: 400px;

        img {
            width: 100%;
            height: 100%;
        }

    }
}

.cube {
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: start;

    .account,
    .pwd {
        p {
            font-size: 20px;
        }

        .account-input,
        .pwd-input {
            font-size: 20px;
            border-radius: 10px;
        }
    }

    .in-cube {
        background-color: #E2C2B3;
        border-radius: 20px;
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1{
            margin-bottom: 50px;
        }
        .btn-area {
            display: flex;

            .login {
                button {
                    border: none;
                    background-color: #ffffff;
                    font-size: 18px;
                    padding: 0 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: 0.7s;

                    &:hover {
                        scale: 1.05;
                    }
                }
            }

            button {
                margin: 0 10px;
            }
        }
    }
}</style>