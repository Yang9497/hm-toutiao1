<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div class="btn_box">
      <el-radio-group v-model="reqParams.collect" @change="toggleCollect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" @click="openDialog" style="float:right" size="small">添加素材</el-button>
    </div>
    <el-dialog title="添加素材" width="300px" :visible.sync="dialogVisible">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <div class="img_list">
      <div class="img-item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="footer" v-if="!reqParams.collect">
          <span
            @click="toggleStatus(item)"
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
          ></span>
          <span @click="deleteImages(item.id)" class="el-icon-delete"></span>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      :total="total"
      hide-on-single-page
       v-if="total > reqParams.per_page"
          style="text-align:center;margin-top:20px"
    ></el-pagination>
  </el-card>
</template>

<script>
import store from '@/store'
export default {
  created () {
    this.getImages()
  },
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      console.log(this.images)
    },
    // toggleCollect () {
    //   this.reqParams.page = 1
    //   this.getImages()
    // },
    toggleCollect () {
      // 更换筛选条件 回到第一页进行预览
      this.reqParams.page = 1
      // 触发这个函数的时候  条件已经发生修改
      this.getImages()
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    deleteImages (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    openDialog () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    handleSuccess (res) {
      this.$message.success('上传图片成功')
      console.log(res)

      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img-item {
    position: relative;
    display: inline-block;
    width: 240px;
    height: 240px;
    border: 1px dashed #ddd;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      height: 30px;
      line-height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      span {
        color: #fff;

        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
