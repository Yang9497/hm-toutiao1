<template>
  <el-card>
    <div slot="header">
      <my-bread>{{articleId?"修改":"发布"}}文章</my-bread>
    </div>

    <el-form ref="form" label-width="100px" :model="resParams">
      <el-form-item label="标题：">
        <el-input v-model="resParams.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quillEditor v-model="resParams.content" :options="editorOption"></quillEditor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="resParams.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 图片按钮 -->
        <div v-if="resParams.cover.type === 1">
          <my-image v-model="resParams.cover.images[0]"></my-image>
        </div>
        <div v-if="resParams.cover.type === 3">
          <my-image v-model="resParams.cover.images[0]"></my-image>
          <my-image v-model="resParams.cover.images[1]"></my-image>
          <my-image v-model="resParams.cover.images[2]"></my-image>
        </div>
      </el-form-item>

      <el-form-item label="频道：">
        <my-channels v-model="resParams.channel_id"></my-channels>
      </el-form-item>
      <el-form-item size="large" v-if="!articleId">
        <el-button type="primary" @click="submit(false)">发表</el-button>
        <el-button @click="submit(true)">创建草稿</el-button>
      </el-form-item>
      <el-form-item size="large" v-else>
        <el-button type="primary" @click="update(false)">修改</el-button>
        <el-button @click="submit(true)">创建草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  // watch   侦听器监听$route.query.id  有两个参数 新的值  旧的值
  watch: {
    '$route.query.id': function (newid, oldid) {
      if (newid) {
        // 当发布文章改查修改文章  回退历史
        this.articleId = this.$route.query.id
        // 判断业务ID存在则修改  不存在 发表
        if (this.articleId) {
          this.getArticle()
        }
        return false
      }
      // 当编辑文章改成修改文章
      this.resParams = {
        title: null,
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      }
      this.articleId = null
    }
  },

  data () {
    return {
      resParams: {
        title: null,
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      },
      articleId: null,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.resParams)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
      // 发请求
      // await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // // 提示
      // this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // // 跳转内容管理
      // this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.resParams
      )
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
      // 发请求
      // await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // // 提示
      // this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // // 跳转内容管理
      // this.$router.push('/article')
    },
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get(`articles/` + this.articleId)
      this.resParams = data
      console.log(data)
    },

    changeType () {
      this.resParams.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
