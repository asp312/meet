<template>
    <div class="customChip">
        <span>{{ chip }}</span>
        <v-icon class="ml-2" @click="removeTag">{{ icons.mdiWindowClose }}</v-icon>
    </div>
</template>

<script>
import { mdiWindowClose } from '@mdi/js';

export default {
    name: 'CustomChip',
    props: ['chip'],
    data () {
        return{
            icons: {
                mdiWindowClose
            }
        }
    },
    methods: {
        removeTag () {
            this.$store.dispatch('filter/removeTag', this.chip)
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>