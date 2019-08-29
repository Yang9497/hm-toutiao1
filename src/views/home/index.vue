<template>
  <el-container class="my-container">
    <el-aside :width="isCollapse?'64px' :'200px'">
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
       <el-menu
      default-active="/"
      class="el-menu-vertical-demo"

      background-color="#002533"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      >

      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="icon el-icon-s-fold" @click="toggleAside()"></i>
        <span class="text"> 江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command="clickItem">
          <span class="el-dropdown-link">
            <img :src="photo" class="avatar" alt />
            <span class="el-dropdown-link name" >
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">

              <!-- @click.stop 阻止事件冒泡   @click.native="setting()" @click.native="logout()" @click.native  给组件绑定原生的事件 -->
              <i class="el-icon-s-tools" ></i>个人设置
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <i class="el-icon-unlock" ></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入 store
import store from '@/store'

export default {

  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    console.log(store)

    const user = store.getUser()
    console.log(user)

    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleAside () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      // 删除本地信息
      console.log(12345)

      store.delUser()
      // 跳转到登录页面
      this.$router.push('/login')
    },
    setting () {
      this.$router.push('/setting')
    },
    clickItem (command) {
      // 判断是setting还是logout
      // 组件提供了监听点击事件 dropdown 组件 command事件 回调函数  选项的指令
      // dropdown-item 组件  command属性的值  指令
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002533;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo{
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu{
      border-right: 0;
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    .icon{
      font-size: 24px;
      vertical-align: middle;
    }
    .text{
      vertical-align: middle;
    }
    .my-dropdown{
        float: right;
         .avatar{
           width: 30px;
           height: 30px;
           vertical-align: middle;
         }
        .name{
          font-weight: 700;
          color: #333;
          vertical-align: middle;
        }
    }
  }
}
</style>
