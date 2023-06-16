<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/indexStore"
export default {
    methods: {
        // mapActions => 取的是pinia裡面actions的資料       
        // ...為淺層拷貝 //1.自己的資料 2.要取用的方法
        ...mapActions(indexStore, ["updateLocation"]),
        logOut() {

            let yes = confirm('確定要登出嗎？');
            if (yes) {
                let body = {

                }
                fetch("http://localhost:8080/log_out", {
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
                        alert("登出成功");
                        sessionStorage.setItem("isLogin",false);
                        location.href = "/";
                    })

            } else {
                next();
            }
        },
        search() {
            console.log(this.inputText);
            if (this.inputText == null) {
                alert("請輸入文字！！");
                return;
            }
            this.$router.push({
                name: "search-page",
                params: {
                    keyword: this.inputText
                }
            })
            // location.href = `/search-page?${this.inputText}`
         },
        
    },
    // mapState => 取的是pinia裡面 state getter的資料           
    computed: {
        ...mapState(indexStore, ["location", "getLocation"])
    },
    data() {
        return {
            isLogin: sessionStorage.getItem("isLogin"),
            inputText: null,
            keyword: null,
            account : sessionStorage.getItem("account")
        }
    },
}
</script>

<template>
    <header>
        <div class="wrapper">
            <div class="search-group">
                <!-- LOGO 回首頁 -->
                <div class="logo">
                    <RouterLink class="link" to="/">
                        <img src="../../pic/Dobby-1.jpg" alt="">
                    </RouterLink>
                </div>
                <!-- 搜尋 -->
                <div class="search-box">
                    <input type="text" class="input-style" v-model="inputText">
                    <i class="fa-solid fa-magnifying-glass" @click="search"  ></i>
                </div>

            </div>


            <div class="function-group">
                <!-- 我的賣場 -->
                <div class="my-market">
                    <RouterLink class="link" :class="{ local: location > 99 && location < 103 }" to="/my-market/orderview">
                        我的賣場</RouterLink>
                </div>
                <!-- 會員中心 -->
                <div class="member-center">
                    <RouterLink class="link" :class="{ local: location > 199 && location < 202 }"
                        to="/member-center/userInfo">
                        會員中心</RouterLink>
                </div>

                <!-- 購物車 -->
                <div class="shopping-car">
                    <RouterLink class="link" :class="{ local: location === 300 }" to="/shopping-car/carview"><i
                            class="fa-solid fa-cart-shopping"></i></RouterLink>
                </div>
                <!-- 註冊/登入 -->
                <p v-if="isLogin == 'true'" class="Hi">Hi  {{ account }}</p>
                <div class="login">
                    
                    <RouterLink v-if="isLogin == 'true'" class="link" :class="{ local: location === 400 }"  @click="logOut" to="" >登出</RouterLink>
                    <RouterLink v-else class="link" :class="{ local: location === 400 }" to="/login" >登入</RouterLink>
                   
                </div>
            </div>


        </div>
        <div class="category">
            <RouterLink class="category-link" to="/category/computer">3C產品</RouterLink>
            <RouterLink class="category-link" to="/category/accessories">配件飾品</RouterLink>
            <RouterLink class="category-link" to="/category/life">居家生活</RouterLink>
            <RouterLink class="category-link" to="/category/casual">休閒用品</RouterLink>
            <RouterLink class="category-link" to="/category/food">美食廣場</RouterLink>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.wrapper {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: end;
    min-width: 1270px;

    .function-group {
        display: flex;
    }

    .search-group {
        display: flex;
        align-items: center;

        .logo {
            width: 100px;
            height: 80px;
            margin: 0 10px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .search-box {
            position: relative;
            border: none;

            i {
                border: none;
            }

            .input-style {
                padding: 5px 40px 5px 5px;
                font-size: 20px;
                border-radius: 10px;
                margin-left: 10px;
                border: none;
            }



            i {
                position: absolute;
                font-size: 20px;
                right: 10px;
                top: 8px;
                cursor: pointer;

                &:hover {
                    scale: 1.05;
                }
            }
        }


    }

}

header {
    width: 100%;
    background-color: #E2C2B3;
    font-size: 20px;
    min-width: 1270px;

    .category {
        width: inherit;
        min-width: 1270px;
        padding: 10px 0;
        display: flex;
        justify-content: space-around;

        .category-link {
            text-decoration: none;
            color: #403234;
            margin: 0 10px;
            font-size: 20px;
            font-weight: bold;
            transition: 0.7s;

            &:hover {
                color: #735b5f;
            }
        }

        background-color: #F7F3F5;
        font-size: 1rem;

    }
}

.link {
    text-decoration: none;
    color: #687477;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 1rem;

    i {
        font-size: 25px;
        padding: 1px 10px;
    }

    &:hover {
        color: black;
        font-weight: bold;
    }
}

.local {
    // border-bottom: white 2px solid;
    border-radius: 6px;
    color: black;
        font-weight: bold;
}
.Hi{
    text-decoration: none;
    color: #687477;
   padding: 0;
     font-weight: bold;
    margin: 0 1rem;
    text-align: center;
}
</style>