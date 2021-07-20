<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索订单区域 -->
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单数据列表展示区域 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column
          width="80px"
          label="订单价格"
          prop="order_price"
        ></el-table-column>
        <el-table-column width="80px" label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'"
              >未付款</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === '1'"
              >已付款</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          width="80px"
          label="是否发货"
          prop="is_send"
        ></el-table-column>
        <el-table-column label="下单时间" width="160px">
          <template slot-scope="scope">{{
            (scope.row.create_time * 1070) | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column width="120px" label="操作">
          <template>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改订单地址"
              placement="top"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showEditAddressDialog"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="success"
                icon="el-icon-location-outline"
                @click="showLogisticsProgressDialog"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页展示区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑地址的对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="editAddressDialogVisible"
      width="50%"
      @close="editAddressDialogClosed"
    >
      <!-- 修改地址的表单 -->
      <el-form
        :model="editAddressForm"
        :rules="editAddressFormRules"
        ref="editAddressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="editAddressForm.address1"
            :options="CityData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editAddressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAddressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAddressDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 物流进度对话框 -->
    <el-dialog
      title="物流进度查询"
      :visible.sync="logisticsProgressDialogVisible"
      width="50%"
    >
    </el-dialog>

    <!-- 物流进度时间线组件区域 -->
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in progressInfo"
        :key="index"
        :timestamp="activity.time"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>z

<script>
// 引入全国省市区县数据
import CityData from './citydata.js'

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 订单数据列表
      orderList: [],
      // 商品总条数
      total: 0,
      // 全国省市区县数据
      CityData,
      // 编辑地址的对话框显示与否
      editAddressDialogVisible: false,
      // 修改地址表单的数据对象
      editAddressForm: {
        address1: [],
        address2: ''
      },
      // 修改地址表单验证规则对象
      editAddressFormRules: {
        address1: [
          { required: true, message: '请选择您要更改的地址', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写您的详细地址', trigger: 'blur' }
        ]

      },
      // 物流进度对话框显示与否
      logisticsProgressDialogVisible: false,
      // 物流进度数据列表
      progressInfo: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    // 获取订单数据列表
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单数据失败！')
      }
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    // 监听当前页订单数据条数变化时触发的事件
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getOrderList()
    },
    // 监听当前所处页面发生变化时触发的事件
    handleCurrentChange (newnum) {
      this.queryInfo.pagenum = newnum
      this.getOrderList()
    },
    // 点击编辑按钮，显示选择地址的对话框
    showEditAddressDialog () {
      this.editAddressDialogVisible = true
    },
    // 监听编辑地址对话框关闭事件
    editAddressDialogClosed () {
      this.$refs.editAddressFormRef.resetFields()
    },
    // 点击物流信息按钮，显示物流进度对话框
    async showLogisticsProgressDialog () {
      // 获取物理进度信息
      const { data: res } = await this.$http.get('/kuaidi/')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流信息失败！')
      }

      this.progressInfo = res.data
      console.log(this.progressInfo)
      this.logisticsProgressDialogVisible = true
    },
    // 点击搜索按钮，根据条件查找订单信息
    findOrderInfo () {
      if (this.queryInfo.query.trim() === '') {
        return this.$message.error('请输入查询条件！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
