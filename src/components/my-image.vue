<template>
  <div class="img-container">
    <div class="img-btn" @click="openDialog">
      <img :src="value || confrimSrc" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div>
            <div>
              <el-radio-group @change="toggleCollect" v-model="reqParams.collect">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <div class="img-list">
                <div
                  class="img-item"
                  :class="{selected:selectedImageUrl === item.url}"
                  v-for="item in images"
                  :key="item.id"
                  @click="seletedImage(item.url)"
                >
                  <img :src="item.url" alt />
                </div>
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="changePage"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confrimImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import confrimSrc from '../assets/images/pic_bg.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },

      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadImageUrl: null,
      confrimSrc: confrimSrc,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    confrimImage () {
      let src = null
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.info('请选择素材')
        src = this.selectedImageUrl
      } else {
        if (!this.uploadImageUrl) return this.$message.info('请上传图片')
        src = this.uploadImageUrl
      }
      // this.confrimSrc = src
      this.$emit('input', src)
      this.dialogVisible = false
    },

    handleImageSuccess (res) {
      this.$message.success('上传成功')
      this.uploadImageUrl = res.data.url
      console.log(res)
    },
    seletedImage (url) {
      this.selectedImageUrl = url
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImage()
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImage()
    },
    openDialog () {
      this.activeName = 'image'
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.dialogVisible = true
      this.getImage()
    },

    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)

      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img-container{
  display: inline-block;
 margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
.img-item {
  position: relative;
  width: 160px;
  height: 120px;
  display: inline-block;
  border: 1px dashed #ddd;
  margin-right: 10px;
  margin-bottom: 10px;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center / 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
