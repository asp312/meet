<template>
  <div class="main-wrapper mb-6">
    <section>
      <img src="~assets/img/banner.png" alt="baner" width="100%"/>
    </section>
    <dnav class="mt-4 mb-4"></dnav>
    <h1>Кроссовки: новинки</h1>
    <ctable></ctable>
  </div>
</template>

<script>
import DinamycNavigation from '../../../../components/DinamycNavigation.vue'
import Table from '../../../../components/Table.vue'

export default {
  components: {
    'dnav': DinamycNavigation,
    'ctable': Table
  },
  data(){
    return{
    }
  }
}
</script>

<style lang="scss">
  .main-wrapper{
    width: 95%;
    max-width: 1625px;
    margin: 0 auto;
  }
</style>