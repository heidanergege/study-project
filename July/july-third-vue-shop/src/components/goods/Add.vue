<template>
  <div>
    <!--面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>

      <!-- 步骤条区域 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 添加商品的表单区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- tab 栏页签区域 -->
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="{ expandTrigger: 'hover', ...cascaderProps }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 循环每个参数项 -->
            <el-form-item
              :key="item.attr_id"
              v-for="item in manyParamsData"
              :label="item.attr_name"
            >
              <!-- 每个参数项中的参数值 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :key="i"
                  v-for="(item1, i) in item.attr_vals"
                  :label="item1"
                  border
                  size="mini"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in onlyParamsData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传图片区域 -->
            <el-upload
              :action="upLoadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addForm.goods_introduce" />
            <el-button type="primary" class="addbtn" @click="add"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 预览图片的对话框 -->
    <el-dialog
      title="预览图片"
      :visible.sync="previewDialogVisible"
      width="50%"
    >
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      // 步骤条激活的当前索引
      activeIndex: '0',
      // 添加商品表单数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      // 添加商品表单验证规则对象
      addFormRules: {
        goods_name: [
          {
            required: true, message: '请输入商品名称', trigger: 'blur'
          }
        ],
        goods_price: [
          {
            required: true, message: '请输入商品价格', trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true, message: '请输入商品重量', trigger: 'blur'
          }
        ],
        goods_number: [
          {
            required: true, message: '请输入商品数量', trigger: 'blur'
          }
        ],
        goods_cat: [
          {
            required: true, message: '请输入商品分类', trigger: 'blur'
          }
        ]
      },
      // 商品分类数据列表
      cateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 动态参数数据列表
      manyParamsData: [],
      // 静态属性数据列表
      onlyParamsData: [],
      // 图片上传的URL地址
      upLoadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件中的headers 请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 图片预览的URL地址
      previewPath: '',
      // 预览图片对话框是否可见
      previewDialogVisible: false
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败！')
      }
      this.cateList = res.data
    },
    // 级联选择器选中项变化，就会触发这个函数
    handleChange () {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
        return
      }
      console.log(this.addForm.goods_cat)
    },
    // 阻止tab 标签 切换的事件
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类!')
        return false
      }
    },
    // tab 项被选时触发
    async tabClicked () {
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'many' }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数失败！')
        }
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals === '' ? [] : item.attr_vals.split(',')
        })
        this.manyParamsData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'only' }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取静态属性失败！')
        }
        this.onlyParamsData = res.data
        console.log(this.onlyParamsData)
      }
    },
    // 处理图片预览时的事件
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.previewDialogVisible = true
    },
    // 处理移除图片时的操作
    handleRemove (file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从 pics 数组中，找到这个图片对应的索引
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      // 3.调用数组的 splice 方法，把图片信息对象 从pics 数组中移除
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm.pics)
    },
    // 监听图片上传成功的事件
    handleSuccess (response) {
      // 拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 将图片信息对象push到 pics 数组中
      this.addForm.pics.push(picInfo)
      console.log(this.addForm)
    },
    add () {
      console.log(this.addForm.goods_introduce)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请输入必需添的项目！')
        }
        const cloneForm = _.cloneDeep(this.addForm)
        cloneForm.goods_cat = cloneForm.goods_cat.join(',')

        // 处理动态参数数据
        this.manyParamsData.forEach(item => {
          const newData = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(',')
          }
          this.addForm.attrs.push(newData)
        })
        // 处理静态属性的数据
        this.onlyParamsData.forEach(item => {
          const newData = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newData)
        })
        cloneForm.attrs = this.addForm.attrs
        console.log(cloneForm)
        // 发送put 请求，提交数据
        const { data: res } = await this.$http.post('goods', cloneForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 10px !important;
}
.previewImg {
  width: 100%;
}
.addbtn {
  margin-top: 20px;
}
</style>
