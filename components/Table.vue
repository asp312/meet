<template>
<div>
    <div class="wrapper">
        <flist></flist>
        <div class="table">
            <sort class="mb-6"></sort>
            <div class="table-wrapper">
                <card v-for="(item, index) of items" :key="index" :item="item"></card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Card from '../components/Card.vue'
import Sort from '../components/Sort.vue'
import FilterList from '../components/FilterList.vue'
import Sneakers from '../mock/items'

export default {
    name: 'Table',
    components: {
        'card': Card,
        'flist': FilterList,
        'sort': Sort
    },
    data () {
        return {
            items: Sneakers
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        display: flex;
        justify-content: space-between;
    }
    .table-wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 36px;
        row-gap: 40px;
    }
    @media (max-width: 1440px) {
        .table-wrapper{
            grid-template-columns: 285px 285px 285px;
            column-gap: 36px;
            row-gap: 40px;
        }
    }
</style>