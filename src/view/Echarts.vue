<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="12">
        <echartsBar :id="id_bar" :option="option_bar"></echartsBar>
      </el-col>
      <el-col :span="12">
        <ehcartsLine :id="id_line" :option="option_line"></ehcartsLine>
      </el-col>
      <el-col :span="12">
        <ehcartsSolidCircle :id="id_solidCircle" :option="option_solidCircle"></ehcartsSolidCircle>
      </el-col>
      <el-col :span="12">
        <ehcartshollowCircle :id="id_hollowCircle" :option="option_hollowCircle"></ehcartshollowCircle>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import '../../Mock/mock.js'
import axios from 'axios'
import echartsBar from '../components/echarts/bar.vue'
import ehcartsLine from '../components/echarts/line.vue'
import ehcartsSolidCircle from '../components/echarts/solidCircle.vue'
import ehcartshollowCircle from '../components/echarts/hollowCircle.vue'
export default {
  components: {
    echartsBar,
    ehcartsLine,
    ehcartsSolidCircle,
    ehcartshollowCircle
  },
  data() {
    return {
      id_bar: 'bar',
      option_bar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      id_line: '12',
      option_line: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      id_solidCircle: '123',
      option_solidCircle: {
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          // orient: 'vertical',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      id_hollowCircle: '1245',
      option_hollowCircle: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'left'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      },
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>