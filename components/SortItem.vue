<template>
  <div>
       <v-menu
          z-index="100"
          :close-on-content-click="false"
          offset-y
          transition="slide-y-transition"
          right
          fixed
          style="position: absolute; right: 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey-light"
                small
                v-bind="attrs"
                v-on="on"
                width="190"
                height="50">
                {{ name.text }}<span v-if="filterCounter > 0">({{ filterCounter }})</span>
              <v-icon
                small
                class="ml-2">
                {{icons.mdiMenuDown}}
              </v-icon>
            </v-btn>
          </template>
          <v-card min-width="320"  v-if="name.type === 'checkboxes'">
              <div class="card-wrapper">
              <div class="header-wrapper">
                <v-card-subtitle class="pa-0">Выбрано: {{ filterArr.length }}</v-card-subtitle>
                <v-btn text class="pa-0" small @click="clear"><u class="grey--text">Очистить</u></v-btn>
              </div>
              <div class="checkbox-wrapper">
              <div v-for="(item, index) of chooseCheckboxSet" :key="index">
              <v-checkbox class="checkbox-item"
                            :value="item.text"
                            :on-icon="icons.mdiCheckboxMarked"
                            :off-icon="icons.mdiCheckboxBlankOutline"
                            hide-details="true"
                            color=#84A2FC
                            v-model="filterArr">
                    <template v-slot:label>
                        <span class="black--text label-check">{{ item.text }}</span>
                    </template>
                    <template v-slot:append>
                        <span>{{ item.count }}</span>
                    </template>
                 </v-checkbox>
                <v-divider class="mt-2"></v-divider>
              </div>
              </div>
              <v-card-actions class="pa-0">
                <v-btn color="black" class="white--text mt-4 acceptBtn" height="50" @click="acceptFilters">Применить</v-btn>
              </v-card-actions>
              </div>
          </v-card>
          <v-card v-if="name.type === 'cost'" min-width="320">
              <div class="card-wrapper">
                <v-card-subtitle class="pa-0">Выберите ценовой диапазон</v-card-subtitle>
                <v-card-text class="pa-0 mt-2">
                    <div class="display-wrapper mb-3">
                        <div class="display-input">
                        <v-text-field
                            :value="range[0]"
                            class="mt-0 pt-0"
                            hide-details
                            outlined
                            height="50"
                            type="number"
                            @change="$set(range, 0, $event)"
                        >
                        </v-text-field>
                        </div>
                        <div class="display-input">
                        <v-text-field
                            :value="range[1]"
                            class="mt-0 pt-0"
                            hide-details
                            outlined
                            height="50"
                            type="number"
                            @change="$set(range, 1, $event)"
                        >
                        </v-text-field>
                        </div>
                    </div>
                    <v-range-slider
                        track-fill-color=#84A2FC
                        thumb-color=#84A2FC
                        track-color="gery-light"
                        v-model="range"
                        :max="max"
                        :min="min"
                        hide-details
                        class="align-center"
                    >
                    </v-range-slider>
                    <v-radio-group v-model="costGroup" class="radio-group">
                        <div v-for="(item, index) of radioArr" :key="index" class="mt-4 rdio-input">
                        <v-radio :value="item.value"
                                color=#84A2FC
                                :on-icon="icons.mdiRadioboxMarked"
                                :off-icon="icons.mdiRadioboxBlank"
                                >
                                <template v-slot:label>
                                    <span class="black--text label-check">{{ item.text }}</span>
                                </template>
                        </v-radio>
                        <v-divider class="mt-2"></v-divider>
                        </div>
                    </v-radio-group>
                    <v-card-actions class="pa-0">
                        <v-btn color="black" class="white--text acceptBtn" height="50" @click="acceptCost">Применить</v-btn>
                    </v-card-actions>
                </v-card-text>
              </div>
          </v-card>
       </v-menu>
  </div>
</template>

<script>
import { mdiMenuDown, mdiCheckboxMarked, mdiCheckboxBlankOutline, mdiRadioboxMarked, mdiRadioboxBlank } from '@mdi/js';
import sneakersBrand from '../mock/brand'
import sneakersSize from '../mock/size'
import sneakersType from '../mock/type'
import sneakersCost from '../mock/cost'

export default {
    name: 'SortItem',
    props: ['name'],
    data () {
        return {
            min: 0,
            max: 73350,
            range: [0, 15000],
            filterArr: [],
            currentType: null,
            filterCounter: 0,
            costGroup: null,
            icons: {
                mdiMenuDown,
                mdiCheckboxMarked,
                mdiCheckboxBlankOutline,
                mdiRadioboxMarked,
                mdiRadioboxBlank
            },
            checkArr: sneakersBrand,
            sexArr: [
                {text: 'Male', count: 367},
                {text: 'Female', count: 127}
            ],
            sizeArr: sneakersSize,
            typeArr: sneakersType,
            popularArr: [
                {text: 'Популярные'}
            ],
            radioArr: sneakersCost
        }
    },
    methods: {
        clear () {
            this.filterArr = []
            this.filterCounter = this.filterArr.length
            this.$store.dispatch('filter/clearFilter', this.currentType)
        },
        acceptFilters () {
            let data = {
                filsters: this.filterArr,
                dataType: this.currentType
            }
            this.$store.dispatch('filter/setFilters', data)
            this.filterCounter = this.filterArr.length
        },
        acceptCost () {
            let mcost = this.costGroup !== null ? this.costGroup : this.range[1]
            let data = {
                maxCost: mcost,
                minCost: this.range[0] > mcost ? 0 : this.range[0]
            }
            this.$store.dispatch('filter/setRangeFilters', data)
            this.filterCounter = this.costGroup !== null || undefined ? 1 : 0
        }
    },
    computed: {
        chooseCheckboxSet () {
            switch (this.name.role) {
                case 'brand':
                    this.currentType = 'brand'
                    return this.checkArr
                case 'size':
                    this.currentType = 'size'
                    return this.sizeArr
                case 'sex':
                    this.currentType = 'sex'
                    return this.sexArr
                case 'type':
                    this.currentType = 'type'
                    return this.typeArr
                    case 'popular':
                    this.currentType = 'popular'
                    return this.popularArr
                default: 
                    return [{text: 'error', count: 500}]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card-wrapper{
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
}
.header-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.checkbox-wrapper{
    height: 300px;
    overflow: scroll;
}
.acceptBtn{
    width: 280px;
    margin: 0 auto;
}
.display-wrapper{
    display: flex;
    justify-content: space-between;
}
.display-input{
    width: 136px;
    display: block;
}
.rdio-input:first-child{
    margin-top: 0 !important;
}
</style>