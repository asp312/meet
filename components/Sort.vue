<template>
    <div>
        <div class="sort-wrapper">
            <sortItem v-for="(item, index) of sortArr" :key="index" :name="item"></sortItem>
        </div>
        <div class="chip-wrapper mt-6">
            <cuchip v-for="(item, index) of getChips" :key="index" :chip="item" class="mb-2"></cuchip>
        </div>
    </div>
</template>

<script>
import SortItem from '../components/SortItem.vue'
import CustomChip from '../components/CustomChip.vue'
import { mdiWindowClose } from '@mdi/js';
import filters from '../mock/filter'

export default {
    name: 'Sort',
    components: {
        'sortItem': SortItem,
        'cuchip': CustomChip
    },
    data () {
        return {
            icons: {
                mdiWindowClose
            },
            sortArr: filters
        }
    },
    computed: {
        getChips () {
            return this.$store.getters['filter/getTags']
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 12px;
    row-gap: 12px;
}
.chip-wrapper{
    display: flex;
    flex-wrap: wrap;
    max-width: 1248px;
}
.customChip{
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #1d1d2044;
    border-radius: 32px;
    font-size: 14px;
    margin-right: 10px;
    padding: 20px 15px;
}
@media (max-width: 1440px) {
        .sort-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        .chip-wrapper{
            max-width: 998px;
        }
    }
</style>