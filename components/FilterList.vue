<template>
    <div class="filterList-wrapper">
        <h3 class="pa-0">Подборки Meet-market</h3>
        <v-list flat>
            <v-list-item-group  v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, index) in items" :key="index" class="pl-0" @click="addTag($event)">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text" :class="`${item.color}--text`"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="item.hot">
                        <v-icon v-text="icons.mdiFire" color="orange"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import { mdiFire } from '@mdi/js';
import tags from '../mock/tags'

export default {
    name: 'FilterList',
    data(){
        return {
            icons: {
                mdiFire
            },
            selectedItem: 1,
            items: tags
        }
    },
    methods: {
        addTag (e) {
            if (this.$store.getters['filter/getTags'].includes(e.target.innerText)) return
            this.$store.dispatch('filter/addTag', e.target.innerText)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>