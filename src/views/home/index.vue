<template>
  <div>
    <div class="container-fluid">
      <el-row class="spannel_list" :gutter="10">
        <el-col :sm="6" :xs="12">
          <div class="spannel">
            <em>99999</em><span>次</span>
            <b>阅读量</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor01">
            <em>520</em><span>次</span>
            <b>日新增阅读数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor02">
            <em>99999</em><span>条</span>
            <b>评论总数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor03">
            <em>99</em><span>条</span>
            <b>日新增评论数</b>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="gragh_pannel" id="curve_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <div class="column_pannel" id="column_show"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'my-home',
  mounted() {
    this.setCurveChartFn()
  },
  methods: {
    // 设置面积图
    setCurveChartFn() {
      // 基于准备好的dom，初始化echarts实例
      const curveChart = echarts.init(document.getElementById('curve_show'))
      // 绘制面积图表
      // 数据源(模拟后台返回的数据)
      const aListAll = [
        { count: 36, date: '2023-04-13' },
        { count: 52, date: '2023-04-14' },
        { count: 78, date: '2023-04-15' },
        { count: 85, date: '2023-04-16' },
        { count: 65, date: '2023-04-17' },
        { count: 72, date: '2023-04-18' },
        { count: 88, date: '2023-04-19' },
        { count: 64, date: '2023-04-20' },
        { count: 72, date: '2023-04-21' },
        { count: 90, date: '2023-04-22' },
        { count: 96, date: '2023-04-23' },
        { count: 100, date: '2023-04-24' },
        { count: 102, date: '2023-04-25' },
        { count: 110, date: '2023-04-26' },
        { count: 123, date: '2023-04-27' },
        { count: 100, date: '2023-04-28' },
        { count: 132, date: '2023-04-29' },
        { count: 146, date: '2023-04-30' },
        { count: 200, date: '2023-05-01' },
        { count: 180, date: '2023-05-02' },
        { count: 163, date: '2023-05-03' },
        { count: 110, date: '2023-05-04' },
        { count: 80, date: '2023-05-05' },
        { count: 82, date: '2023-05-06' },
        { count: 70, date: '2023-05-07' },
        { count: 65, date: '2023-05-08' },
        { count: 54, date: '2023-05-09' },
        { count: 40, date: '2023-05-10' },
        { count: 45, date: '2023-05-11' },
        { count: 38, date: '2023-05-12' }
      ]

      // 但是图标要求直接给数字的值, 所以要把对象的值取出来形成2个只有值的数组
      const aCount = []
      const aDate = []

      for (let i = 0; i < aListAll.length; i++) {
        aCount.push(aListAll[i].count)
        aDate.push(aListAll[i].date)
      }

      // 面积图的echarts配置项(参考文档复制)
      const chartopt = {
        title: {
          text: '月新增阅读数', // 标题
          left: 'center', // 位置居中
          top: '10' // 标题距离容器顶部px
        },
        tooltip: {
          // 提示框组件
          trigger: 'axis' // 坐标轴触发(鼠标放在坐标轴就能出提示框)
        },
        legend: {
          // 图例组件(每种颜色的意思)
          data: ['新增阅读'], // 图例文字解释(要和series里name对应)
          top: '40' // 距离容器顶部px
        },
        toolbox: {
          // 工具栏
          show: true, // 要显示
          feature: {
            // 各工具配置项
            mark: { show: true }, // 辅助线开关
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            magicType: { show: true, type: ['line', 'bar'] }, // 动态类型切换
            restore: { show: true }, // 配置项还原
            saveAsImage: { show: true } // 点击保存下载图片
          }
        },
        xAxis: [
          // 水平轴显示
          {
            name: '日',
            type: 'category',
            boundaryGap: false, // 坐标轴两边留白策略 (不留白)
            data: aDate // 水平轴上的数字数据 (时间)
          }
        ],
        yAxis: [
          // 垂直轴显示
          {
            name: '月新增阅读数',
            type: 'value' // 以series里的data值做划分段
          }
        ],
        series: [
          // 系列(控制图表类型和数据)
          {
            name: '新增阅读',
            type: 'line', // 折线图
            smooth: true, // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示
            areaStyle: { type: 'default' }, // 区域填充样式。设置后显示成区域面积图。
            itemStyle: { color: '#f80', lineStyle: { color: '#f80' } }, // 折线拐点标志的样式。
            data: aCount // 真正数据源(用下标和x轴数组对应)
          }
        ],
        grid: {
          // 直角坐标系内绘图网格
          show: true,
          x: 50, // grid 组件离容器偏移量, 左侧
          x2: 50, // 右侧
          y: 80, // 上
          height: 220 // 高度
        }
      }

      curveChart.setOption(chartopt)
    },
    // 设置底部柱状图
    columnChartFn() {
      const oColumn = echarts.init(document.getElementById('column_show'))
      const oColumnopt = {
        title: {
          text: '文章阅读量',
          left: 'center',
          top: '10'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['星晴', '蒲公英的约定', '借口', '枫'],
          top: '40'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月']
          }
        ],
        yAxis: [
          {
            name: '阅读量',
            type: 'value'
          }
        ],
        series: [
          {
            name: '星晴',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#fd956a'
            },
            data: [800, 708, 920, 1090, 1200]
          },
          {
            name: '蒲公英的约定',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#2bb6db'
            },
            data: [400, 468, 520, 690, 800]
          },
          {
            name: '借口',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#13cfd5'
            },
            data: [500, 668, 520, 790, 900]
          },
          {
            name: '枫',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#00ce68'
            },
            data: [600, 508, 720, 890, 1000]
          }
        ],
        grid: {
          show: true,
          x: 50,
          x2: 30,
          y: 80,
          height: 260
        },
        dataZoom: [
          // 给x轴设置滚动条
          {
            start: 0, // 默认为0
            end: 100 - 1000 / 31, // 默认为100
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 8, // 组件高度
            left: 45, // 左边的距离
            right: 50, // 右边的距离
            bottom: 26, // 右边的距离
            handleColor: '#ddd', // h滑动图标的颜色
            handleStyle: {
              borderColor: '#cacaca',
              borderWidth: '1',
              shadowBlur: 2,
              background: '#ddd',
              shadowColor: '#ddd'
            }
          }
        ]
      }
      oColumn.setOption(oColumnopt)
    }
  }
}
</script>

<style lang="less" scoped>
.spannel_list {
  margin-top: 20px;
}

.spannel {
  height: 100px;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  margin-bottom: 20px;
}

.spannel em {
  font-style: normal;
  font-size: 50px;
  line-height: 50px;
  display: inline-block;
  margin: 10px 0 0 20px;
  font-family: 'Arial';
  color: #83a2ed;
}

.spannel span {
  font-size: 14px;
  display: inline-block;
  color: #83a2ed;
  margin-left: 10px;
}

.spannel b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}

.scolor01 em,
.scolor01 span {
  color: #6ac6e2;
}

.scolor02 em,
.scolor02 span {
  color: #5fd9de;
}

.scolor03 em,
.scolor03 span {
  color: #58d88e;
}

.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}

.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
