<template>
  <div>
    <!--面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示信息区域 -->
      <el-alert
        show-icon
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      >
      </el-alert>

      <!-- 商品分类选择区域 -->
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <!-- 级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="{
              expandTrigger: 'hover',
              ...cascaderprops,
            }"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!-- tab 栏页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加动态参数的按钮 -->
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="mini"
                :disabled="isBtnDisabled"
                @click="addDialogVisible = true"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- 动态参数的表格 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="i"
                  v-for="(item, i) in scope.row.attr_vals"
                  closable
                  @close="handleClosed(i, scope.row)"
                >
                  {{ item }}
                </el-tag>
                <!-- 添加tag标签与输入框的切换 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditParamsDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加静态属性的面板 -->
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="mini"
                :disabled="isBtnDisabled"
                @click="addDialogVisible = true"
                >添加属性</el-button
              >
            </el-col>
          </el-row>
          <!-- 静态属性的表格 -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="i"
                  v-for="(item, i) in scope.row.attr_vals"
                  closable
                  @close="handleClosed(i, scope.row)"
                >
                  {{ item }}
                </el-tag>
                <!-- 添加tag标签与输入框的切换 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditParamsDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数、属性的对话框 -->
    <el-dialog
      :title="'添加' + DialogTitleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 添加参数，属性的表单 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="DialogTitleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数、属性的对话框 -->
    <el-dialog
      :title="'添加' + DialogTitleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 修改参数，属性的表单 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="DialogTitleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品分类数据列表
      cateList: [],
      // 级联选择器的配置对象
      cascaderprops: {
        // 级联选择器指定选项值的对应对象的属性值
        value: 'cat_id',
        label: 'cat_name',
        chlidren: 'children'
      },
      // 级联选择器双向绑定到的数组数据列表
      selectedCateKeys: [],
      // tab 页签当前显示tab项
      activeName: 'many',
      // 动态参数事件列表
      manyTableData: [],
      // 静态属性事件列表
      onlyTableData: [],
      // 添加参数，属性对话框的显示与否
      addDialogVisible: false,
      // 添加参数，属性表单数据对象
      addForm: {
        attr_name: ''
      },
      // 添加参数，属性表单验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      // 控制修改参数对话框的显示与否
      editDialogVisible: false,
      // 修改参数对话框的数据对象
      editForm: {},
      // 修改参数对话框里表单的验证规则对象
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      // 输入框的显示与否
      inputVisible: false,
      // 添加tag标签输入框的数据
      inputValue: ''

    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取产品分类失败！')
      }
      this.cateList = res.data
    },
    // 级联选择器选中项变化，会触发这个函数
    handleChange () {
      console.log(this.selectedCateKeys)
      this.getParamsList()
    },
    // 监听切换动态和静态事件
    handleTabClick () {
      console.log(this.activeName)
      this.getParamsList()
    },
    // 获取参数的数据列表
    async getParamsList () {
      // 只能选择三级类的选项卡
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败！')
      }
      // 用forEach把获取到的数据中的attr_vals 项中逗号分割的字符串转化成数组
      res.data.forEach(element => {
        element.attr_vals = element.attr_vals ? element.attr_vals.split(',') : []
        element.inputVisible = false
        element.inputValue = ''
      })
      console.log(res.data)
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    // 监听添加参数，属性对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击确定按钮，添加参数
    addParams () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 201) {
          return this.$message.error('添加参数失败！')
        }
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        this.getParamsList()
      })
    },
    // 点击编辑按钮，显示修改参数对话框
    async showEditParamsDialog (id) {
      // 获取当前的参数名称信息，并显示在表单中
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${id}`, { params: { attr_sel: this.activeName } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数失败！')
      }
      this.editForm = res.data

      this.editDialogVisible = true
    },
    // 监听修改参数对话框的关闭事件
    editDialogClosed () {
      // 清空对话框里表单的数据
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定按钮，提交修改参数表单
    editParams () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新参数失败！')
        }
        this.$message.success('更新参数成功！')
        this.editDialogVisible = false
        this.getParamsList()
      })
    },
    // 点击删除按钮，删除参数和属性
    async removeParams (attrId) {
      // 先弹出提示框
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error)
      if (confirmResult !== 'confirm') {
        return this.$message.info('您已取消了删除！')
      }
      const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${attrId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败！')
      }
      this.$message.success('删除参数成功！')
      this.getParamsList()
    },
    // 输入框失去焦点和抬起回车键时触发该事件
    async handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputVisible = false
        row.inputValue = ''
        return
      }
      // 如果没有return，则证明输入的有内容，需要提交上去
      row.attr_vals.push(row.inputValue)
      row.inputVisible = false
      row.inputValue = ''
      // 把新的本地添加过的 attr_vals 值推送到服务器保存
      this.saveAttrVals(row)
    },
    // 按下新建tag按钮，显示文本框
    showInput (row) {
      row.inputVisible = true
      // $nextTick 方法是当页面重新渲染后再执行回调函数
      this.$nextTick(_ => {
        // 让当前文本框自动获取焦点
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 点击tag标签的关闭按钮时触发根据当前索引删除当前tag参数项
    handleClosed (i, row) {
      row.attr_vals.splice(i, 1)
      // 把新的本地添加过的 attr_vals 值推送到服务器保存
      this.saveAttrVals(row)
    },
    // 把新的本地添加过的 attr_vals 值推送到服务器保存
    async saveAttrVals (row) {
      const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(',')
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改参数项失败！')
      }
      this.$message.success('修改参数项成功！')
    }

  },
  computed: {
    // 动态参数和静态属性按钮的启禁用条件
    isBtnDisabled () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类的id
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 添加参数，属性对话框title 文本显示切换
    DialogTitleText () {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>

<style lang="less" scoped>
.el-alert {
  color: #fff !important;
  background-color: #e6a23c !important;
}
.el-cascader {
  margin: 20px 0;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>
