<script>
import {mapActions} from "pinia";
import indexStore from "../stores/indexStore"
import TableView from "../components/Table.vue";
export default{
    components : {
        TableView
    },
    data() {
        return {
            buy : "buy"
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(201);
        
    }
}
</script>

<template>
    <div>
        <TableView :buy="buy"/>
    </div>
</template>

<style>
</style>