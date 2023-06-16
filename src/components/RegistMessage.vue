<script>

export default{
    methods: {
        push() {
            // 觸發自定義事件
            this.$emit("outsideWindows")
        }
    },
}

</script>

<template>

    <!-- 顯示訊息用視窗 -->

    <div class="container">

        <div class="info-area">    
            <h2>註冊成功</h2>
            <RouterLink class="link" to="/login">返回登入</RouterLink>

            <!-- <i class="fa-solid fa-x" @click="push"></i> -->
            <!-- 退出按鈕 -->
            <!-- <i class="fa-sharp fa-solid fa-circle-xmark" @click="push"></i> -->
            
        </div>

        <!-- 開視窗後背景 -->
        <div class="background"></div>
    </div>

</template>


<style lang="scss" scoped>
    .container{
        //fixed: 物件定在螢幕上()
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        

        .info-area{
            width: 25vw;
            height: 25vh;
            background-color: white;
            border-radius: 10px;
            top : 40%;
            left:42%;
            z-index: 10;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            i{
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
            }
        }


        .background{
            position: absolute;
            top: 0;
            left: 0;

            width: inherit;
            height: inherit;
            background-color: black;
            opacity: 0.8;
            z-index: -1;
        }
    }

</style>