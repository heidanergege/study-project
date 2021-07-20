<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="showList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="(e) => sbStatusChange(e, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneNum }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewkey === 'all' ? 'primary' : 'default'"
            @click="ChangeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewkey === 'undone' ? 'primary' : 'default'"
            @click="ChangeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewkey === 'done' ? 'primary' : 'default'"
            @click="ChangeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewkey']),
    ...mapGetters(['unDoneNum', 'showList'])
  },
  methods: {
    handleInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addItem () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addList')
    },
    removeItemById (id) {
      this.$store.commit('removeItem', id)
    },
    sbStatusChange (e, id) {
      const param = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('checkboxStatus', param)
    },
    clear () {
      this.$store.commit('clearDone')
    },
    ChangeList (key) {
      // console.log(key)
      this.$store.commit('changeBtnStatus', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
