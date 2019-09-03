<template>
  <el-card>
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="粉丝列表" name="list">
        <div class="imglist">
          <div class="imgitem" v-for="item in fanslist" :key="item.id.toString()">
            <div class="block">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
            </div>
            <p>{{item.name}}</p>
            <el-button type="primary" plain size="mini">+关注</el-button>
          </div>
        </div>

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
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="photo">
        <div ref="dom" style="width:600px;height:400px"></div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  created () {
    this.getfans()
  },
  mounted () {
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    const option = {
      color: ['red'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  data () {
    return {
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 24
      },
      fanslist: [],
      total: 0
    }
  },
  methods: {
    changePager (newpage) {
      this.reqParams.page = newpage
      this.getfans()
    },
    async getfans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      console.log(data)
      this.total = data.total_count
      this.fanslist = data.results
    }
  }
}
</script>

<style lang="less" scoped>
.imgitem {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  padding-top: 15px;
  p {
    font-size: 12px;
  }
}
</style>
