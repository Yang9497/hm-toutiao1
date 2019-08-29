<template>
  <div class="login">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" :model="loginForm"  :rules="rules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item >
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click="login()" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确手机格式'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13488888888',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //  调用validate对整体表单进行验证
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http.post('authorizations', this.loginForm)
          // .then((res) => {
          //   //  成功进行跳转
          //   // res  是响应对象  res.data 响应主体    res.data.data(响应主体包含 data message)
          //   // 用户信息  res.data.data
          //   // 操作用户信息 就是操作store存储
          //   store.setUser(res.data.data)
          //   this.$router.push('/')
          // })
          // .catch(() => {
          //   this.$message.error('手机号或验证码错误')
          // })
          // const { data: { data } } = this.$http.post('authorizations', this.loginForm)
          // store.setUser(data)
          // this.$router.push('/')
          try {
            // 使用async await 调用接口获取所有的数据
            // 使用await修饰的函数  返回值为promise 等于返回后的结果
            // await 同步执行这个函数 阻碍当前函数执行
            // await的使用必须在async 修饰的函数中（await的外层函数必须加上async）
            // 任何报错代码 使用try{}catch(E){} 进行处理
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
