<template>
  <div>
    <!-- store 公共数据用法一 -->

    <h3>当前count的值为：{{ $store.state.count }}</h3>
    <h4>{{ $store.getters.showNum }}</h4>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandlerN">+N</button>
    <button @click="btnHandlerAsync">async延时+1</button>
    <button @click="btnHandlerAsyncN">async延时+N</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    btnHandler1 () {
      this.$store.commit('add')
    },
    btnHandlerN () {
      this.$store.commit('addN', 3)
    },
    btnHandlerAsync () {
      // dispatch('')方法是专门用来调用 action中的方法的
      this.$store.dispatch('addAsync')
    },
    btnHandlerAsyncN () {
      this.$store.dispatch('addAsyncN', 5)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
