<script>
import TableView from "../components/Table.vue"
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"
export default {
    components: {
        TableView
    },

    data() {
        return {
            buy: "sell"
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(100);
        
    }

}
</script>

<template>
    <div>
        <TableView :buy="buy" />
    </div>
</template>

<style lang="scss" scoped>
</style>