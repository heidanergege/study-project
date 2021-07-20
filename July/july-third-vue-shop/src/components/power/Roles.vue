<template>
  <div>
    <!--面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加角色区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              :key="item1.id"
              v-for="(item1, i1) in scope.row.children"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  :key="item2.id"
                  v-for="(item2, i2) in item1.children"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      :key="item3.id"
                      v-for="item3 in item2.children"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- id列 -->
        <el-table-column
          label="编号"
          type="index"
          width="50px"
        ></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scoped">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scoped.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRoleInfo(scoped.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showGetRightsDialog(scoped.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 添加用户对话框主体内容区域 -->
      <el-form
        :model="addRoles"
        :rules="addRolesRules"
        ref="addRolesRef"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色的对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 修改用户对话框主体内容区域 -->
      <el-form
        :model="editRoles"
        :rules="editRolesRules"
        ref="editRolesRef"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRolesInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="getRightsDialogVisible"
      width="50%"
      @close="getRightsDialog"
    >
      <!-- tree型数据展示区域 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        ref="treeRef"
        show-checkbox
        :default-expand-all="true"
        node-key="id"
        :default-checked-keys="defaultKeys"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="getRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 角色数据列表
      rolesList: [],
      // 角色权限数据列表
      rightsList: [],
      // 添加角色的对话框是否显示
      addDialogVisible: false,
      // 修改角色的对话框是否显示
      editDialogVisible: false,
      // 分配权限的对话框是否显示
      getRightsDialogVisible: false,
      // 添加角色数据对象
      addRoles: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色数据对象
      editRoles: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点ID值数组
      defaultKeys: [],
      // 将要分配角色权限的id
      rolesId: '',
      // 添加角色输入框的校验规则
      addRolesRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 16, message: '角色名称的长度在3~16个字符之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请对您的角色进行描述', trigger: 'blur' },
          { min: 3, max: 16, message: '角色名称的长度在3~16个字符之间', trigger: 'blur' }
        ]
      },
      // 修改角色输入框的校验规则
      editRolesRules: {
        roleName: [
          { required: true, message: '请输入您想更改的角色名称', trigger: 'blur' },
          { min: 3, max: 16, message: '角色名称的长度在3~16个字符之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请对您更改后的角色进行描述', trigger: 'blur' },
          { min: 3, max: 16, message: '角色名称的长度在3~16个字符之间', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 获取角色数据列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolesList = res.data
    },
    // 添加角色信息
    addRolesInfo () {
      // 根据用户输入的信息进行预校验
      this.$refs.addRolesRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRoles)
        if (res.meta.status !== 201) {
          return this.$message.error('创建角色失败！')
        }
        this.addRoles = res.data
        this.getRolesList()
        this.$message.success(res.meta.msg)
        this.addDialogVisible = false
      })
    },
    // 监听添加角色对话框关闭事件
    addDialogClosed () {
      // 清空对话框内容
      this.$refs.addRolesRef.resetFields()
    },
    // 点击编辑按钮， 显示修改用户角色信息对话框
    async showEditDialog (id) {
      // 发起根据ID查询角色的请求
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取角色信息失败！')
      this.editRoles = res.data
      this.editDialogVisible = true
    },
    // 监听修改角色对话框关闭事件
    editDialogClosed () {
      // 重置对话框内容
      this.$refs.editRolesRef.resetFields()
    },
    // 修改用户角色信息
    editRolesInfo () {
      // 先进行表单的预校验
      this.$refs.editRolesRef.validate(async valid => {
        // 如果校验结果为false 就return
        if (!valid) {
          return this.$message.error('输入错误')
        }
        // 如果为true就提交数据
        await this.$http.put('roles/' + this.editRoles.roleId, {
          roleName: this.editRoles.roleName,
          roleDesc: this.editRoles.roleDesc
        })
        // 重新获取数据渲染页面
        this.getRolesList()
        // 隐藏对话框
        this.editDialogVisible = false
        // 提示用户修改成功
        this.$message.success('修改角色信息成功')
      })
    },
    // 删除用户角色对话框
    async deleteRoleInfo (id) {
      // 弹出提示信息的对话框
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 否则（返回结果为 confirm时）按下确定按钮时，删除角色数据
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败!')
      }
      this.getRolesList()
      this.$message.success('角色删除成功')
    },
    // 根据id删除权限
    async removeRightById (role, rightId) {
      // 先弹出提示框
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('您已取消删除！')
      }
      // 发起delete请求删除数据
      const { data: res } = await this.$http.delete(`roles/${role.id}+/rights/${rightId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      // 把相应最新权限数据重新赋值给 role的children，这样就不会重新加载页面二造成下拉列表的关闭
      role.children = res.data
    },
    // 显示分配权限的对话框
    async showGetRightsDialog (role) {
      this.rolesId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色权限失败！')
      }
      this.rightsList = res.data
      // 调用递归函数获取三级节点的id
      this.getLeafKeys(role, this.defaultKeys)
      this.getRightsDialogVisible = true
    },
    // 定义一个递归函数，获取角色下所有三级权限的id，并保存到 defaultKeys 数组中
    getLeafKeys (node, arr) {
      // 如果当前节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      // 递归的方式一直调用这个函数，直到这个节点里面没有了children这个属性
      node.children.forEach(element => {
        this.getLeafKeys(element, arr)
      })
    },
    // 监听分配权限对话框关闭事件
    getRightsDialog () {
      this.defaultKeys = []
    },
    async allotRights () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // 不数组转成以逗号分隔的字符串
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.rolesId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败！')
      this.$message.success('分配角色权限成功')
      this.getRolesList()
      this.getRightsDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 8px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
