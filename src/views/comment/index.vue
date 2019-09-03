<template>
  <div>
    <el-card>
      <div class="header">
        <my-bread></my-bread>
      </div>

      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
               {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width='120'>
          <template slot-scope="scope">
             <el-button @click="toggleStatus(scope.row)" type="success" v-if="scope.row.comment_status" size="small">打开评论</el-button>
             <el-button @click="toggleStatus(scope.row)" type="danger" v-else size="small">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
       layout="prev, pager, next"
       :total="total"
       :page-size="resParams.per_page"
       :current-page="resParams.page"
       @current-change="changePage"
       hide-on-single-page
        v-if="total > reqParams.per_page"
          style="text-align:center;margin-top:20px"
       ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getcomment()
  },
  data () {
    return {
      articles: [],
      resParams: {
        page: 1,
        response_type: 'comment',
        per_page: 20
      },
      total: 0
    }
  },
  methods: {
    async toggleStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      //   成功提示
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },

    async getcomment () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.resParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changePage (news) {
      this.resParams.page = news
      this.getcomment()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
