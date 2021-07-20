<template>
  <div>
    <!-- store 公共数据用法二 -->

    <h3>当前count的值为：{{ count }}</h3>
    <h4>{{ showNum }}</h4>
    <button @click="sub">-1</button>
    <button @click="subN(10)">-N</button>
    <button @click="subAsync">async延时 -1</button>
    <button @click="subAsyncN(5)">async延时 -N</button>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subAsyncN'])
    // btnHandler1 () {
    //   // this.$store.commit('sub')
    //   this.sub()
    // },
    // btnHandlerN () {
    //   this.subN(6)
    // },
    // btnHandlerAsync () {
    //   this.subAsync()
    // },
    // btnHandlerAsyncN () {
    //   this.subAsyncN(5)
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
