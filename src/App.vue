<script >
import { RouterLink, RouterView } from 'vue-router';
import HeaderView from "./components/Header.vue";
import FooterView from "./components/Footer.vue";
export default {
    components: {
        HeaderView,
        FooterView
    }

}
</script>

<template>
    <HeaderView />
    <div class="showData">
        <RouterView />
    </div>
    <FooterView/>
</template>

<style lang="scss" >
body{
    margin: 0;
    min-width: 1270px;
}
#app{
    min-width: 1270px;
}
.showData{
    width: 80vw;
    height: auto;
    margin: 0 auto;
}
</style>
