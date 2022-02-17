<template>
    <section>
      <nav>
        <ul class="customNavList pl-0">
          <li v-for="(item, index) of routeArr" :key="index" @click="click(index)" class="customItemList">{{item}}<span v-if="index !== routeArr.length-1" class="mr-2 ml-2">/</span> </li>
        </ul>
      </nav>
    </section>
</template>

<script>
export default {
    name: 'DinamycNavigation',
    data () {
        return{
            routeArr: []
        }
    },
    mounted () {
        this.start()
    },
    methods: {
        start () {
            this.routeArr = this.$route.path.split('/')
        },
        click (idx) {
            let newLink = this.routeArr.slice(0, idx+1).toString().replace(/,/gi, '/')
            this.$router.push(`/${newLink}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.customNavList{
    list-style: none;
    display: flex;
    color: rgb(170, 170, 170);
}
.customItemList:hover{
    color: $customPurple;
    cursor: pointer;
}
</style>