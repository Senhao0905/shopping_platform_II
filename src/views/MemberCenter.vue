<script>
import FuctionSelect from "../components/FunctionSelect.vue"
import { RouterView } from 'vue-router';
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"

export default {
    components: {
        FuctionSelect
    },
    methods: {
       
    },
    data() {
        return {
            title: "會員中心",
            member: [
                {   
                    index:200,
                    name: "會員資料修改",
                    to: "/member-center/userInfo"
                },
                {
                    index:201,
                    name: "訂單查詢",
                    to: "/member-center/orderInfo"
                }
            ],
           
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(200);
    }
}
</script>

<template>
    <div class="userInfo-group">
        <FuctionSelect :member="member" :title="title" />
        <div class="user-box">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.userInfo-group {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .user-box {
        width: 100vw;
        height: 100vh;
        background-color: rgb(253, 253, 253);
    }
}
</style>