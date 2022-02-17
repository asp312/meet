<template>
  <v-card max-width="285" class="item-card" elevation="6" min-height="328">
      <v-icon class="heart-pic" color="red" @click="like"> {{ likePic }} </v-icon>
    <img
      height="160"
      :src="require(`../assets/img/${item.src}`)"
    />
    <section class="description-section">
        <v-card-title>{{ item.cost }} руб.</v-card-title>
        <v-card-text class="description">
           {{ item.name }}
        </v-card-text>
        <div class="chip-card-wrapper mb-2">
            <v-chip :color="`${chip.color}`" :class="`mr-3 mb-3 ${chip.textcolor}--text`" label v-for="(chip, index) of item.labels" :key="index">{{ chip.text }}</v-chip>
        </div>
    </section>
  </v-card>
</template>

<script>

export default {
    name: 'Card',
    props: ['item'],
    data () {
        return {
            userLike: false,
            likePic: 'mdi-cards-heart-outline'
        }
    },
    methods: {
        like () {
            this.userLike = !this.userLike
        }
    },
    watch: {
        userLike(){
            if (this.userLike === false) {
                return this.likePic = 'mdi-cards-heart-outline'
            }
            return this.likePic = 'mdi-cards-heart'
        }
    }
}
</script>

<style lang="scss" scoped>
.item-card{
    transition: $transTime;
    &:hover{
    transform: scale(1.1);
    transition: $transTime;
}
}
.description{
    height: 50px;
}
.heart-pic{
    position: absolute;
    top: 28px;
    right: 26px;
    transition: $transTime;
    &:hover{
    transform: scale(1.5);
    transition: $transTime;
}
}
.chip-card-wrapper{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
}
</style>