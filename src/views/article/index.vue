<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model=" reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用组件   v-model ====  :value  @input  -->
          <my-channels v-model="reqParams.channel_id"></my-channels>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>

      <el-table :data="articles" style="width: 100%,taxt-align:center">
        <!-- <el-table-column  label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 120px; height: 100px;border: 1px solid #ccc"
              :src="scope.row.cover.images[0]"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" style="width: 120px; height: 100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>-->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:160px;height:100px;border:1px solid #ddd"
              fit="contain"
              :preview-src-list="scope.row.cover.images"
            >
              >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="160" height="100" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column width="120" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="$router.push(`/publish?id=${scope.row.id}`)"
              type="primary"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              plain
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
       v-if="total > reqParams.per_page"
          style="text-align:center;margin-top:20px"
        background
        layout="prev, pager,
       next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getArticle()
  },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 20,
        page: 1
      },

      // 频道的下拉选项数据
      channelOptions: [],
      // 日期数据  格式数组 [起始日期，结束日期]
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  methods: {
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count

      console.log(this.articles)
    },
    changePager (newpager) {
      this.reqParams.page = newpager
      this.getArticle()
    },
    changeDate (valueArr) {
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
      console.log(this.reqParams.begin_pubdate, this.reqParams.end_pubdate)
    },

    search () {
      // 根据新的筛选条件获取数据
      // 将页码重置为一
      // 严谨处理  当ID为''时  将其转化为null
      this.page = 1
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null

      this.getArticle()
    },
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '爆头提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)

          this.$message.success('删除成功')
          this.getArticle()
        })
        .catch(err => {
          this.$message.error('删除失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
