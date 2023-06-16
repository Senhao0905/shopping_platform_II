<script>
import Info from "../components/RegistMessage.vue";
// routerLink




export default {
    components: {
        Info

    },

    data() {
        return {
            // body : [],        
            account: null,
            pwd: null,
            name: null,
            address: null,
            phone: null,
            isShow: false,

        }
    },
    methods: {
        register() {


            const body =
            {
                "account": this.account,
                "pwd": this.pwd,
                "name": this.name,
                "address": this.address,
                "phone": this.phone
            }

            // 條件式判斷
            // if(){
            //     alert("error");
            //     return  
            // }

            console.log(body);

            // fetch("api位址", {json格式})
            fetch("http://localhost:8080/register", {

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

                // 後端程式出錯彈跳視窗:
                .then((response) => {

                    // if(!response.ok){
                    //     // throw new Error('Error accrued: ' + response.status);
                    //     alert("後臺系統出錯!");
                    // }

                    // 取得後端程式的回應
                    return response.json();
                })

                .then((data) => {

                    // 檢查後臺程式: Response的data裡message項目要是沒有"successful"
                    // 的結果就報錯並結束流程
                    if (data.message !== "Successful!!") {
                        alert("註冊資料有誤!");
                        console.log(data);
                        return;
                    }


                    this.isShow = !this.isShow;
                    console.log(data);


                })
        },
        backLogin(){
            this.$router.push("/login");
        }


    }
}
</script>

<template>
    <div class="main">
        <div class="logo">
            <div class="imgbox">
                <img src="../../pic/Dobby-removebg.jpg" alt="logo">
            </div>
        </div>


        <div class="cube">

            <div class="in-cube">
                <h1>會員註冊</h1>


                <div class="info-group">

                    <div class="info-1">
                        <p>帳號
                            <input type="text" v-model="account">
                        </p>
                    </div>


                    <div class="info-2">
                        <p>密碼
                            <input type="password" v-model="pwd">
                        </p>
                    </div>


                    <div class="info-3">
                        <p>姓名
                            <input type="text" v-model="name">
                        </p>
                    </div>


                    <div class="info-4">
                        <p>地址
                            <input type="text" v-model="address">
                        </p>
                    </div>


                    <div class="info-5">
                        <p>電話
                            <input type="tel" v-model="phone">
                        </p>
                    </div>

                </div>

                <div class="btn">

                    <!-- 點擊事件發生後啟用register功能 -->
                    <button type="button" @click="register">註冊</button>
                    <button type="button" @click="backLogin">返回登錄</button>

                    <Info v-if="isShow" @outsideWindows="register">
                        <h2>彈跳視窗</h2>
                    </Info>

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
    justify-content: start;
    align-items: center;

    .in-cube {
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background-color: #E2C2B3;
        h1{
           margin-bottom: 50px;
        }
        .btn {
            button {
                border: none;
                background-color: #ffffff;
                font-size: 18px;
                padding: 0 20px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.7s;
                margin: 10px;
                &:hover {
                    scale: 1.05;
                }
            }
        }

        .info-group {
            p {
                font-size: 20px;
                font-weight: bold;
            }

            input {
                font-size: 20px;
                border-radius: 10px;
                border: none;
            }
        }
    }
}</style>