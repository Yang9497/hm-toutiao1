<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form label-width="120px" >
              <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
              <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
              <el-form-item label="媒体名称：">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍：">
                <el-input type="textarea" :rows="3" v-model="userInfo.intro">

                </el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="save">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upload"
            >
              <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            </el-upload>
            <p style="text-align: center;font-size: 14px;">修改头像</p>

          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import store from '@/store'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {
        id: null,
        name: null,
        intro: null,
        email: null,
        mobile: null,
        photo: null
      }

    }
  },
  methods: {
    async upload (result) {
      //  获取文件对象
      const file = result.file
      // 使用formdata追加文件对象
      const formdata = new FormData()
      formdata.append('photo', file)
      // 使用axios 发送请求
      const { data: { data } } = await this.$http.patch('user/photo', formdata)
      // 成功提示  预览  本地存储 更新home组件头像
      this.$message.success('更换头像成功')
      this.userInfo.photo = data.photo
      const localUser = store.getUser()
      localUser.photo = data.photo
      store.setUser(localUser)
      eventBus.$emit('updataphoto', data.photo)
    },
    async  getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.userInfo = data
    },
    async save () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', { name, intro, email })
      // 成功提示
      this.$message.success('保存设置成功')
      // 修改本地存储
      const localUser = store.getUser()
      localUser.name = name
      store.setUser(localUser)
      // 更新home组件的名称
      // eventBus.$emit('updatename', name)
      eventBus.$emit('updateName', name)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
