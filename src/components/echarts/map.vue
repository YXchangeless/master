<template>
  <div class="power_info_fhs">
    <div id="viewDiv_dyfzqk" style="width: 1200px; height: 600px" v-on:dblclick="doubleclick"></div>
    <!-- 统计 -->
    <div class="cenBox" v-show="0">
    </div>
    <!-- 图例 -->
    <!-- <div id="legend_dym2">
      <div id="legend_titlem2">
        图例
        <div class="legend_c" @click="showLayer(0)">
          <img src="~./icon/水电_已建.png" alt>常规水电
        </div>
        <div class="legend_c" @click="showLayer(1)">
          <img src="~./icon/抽蓄_已建.png" alt>抽蓄
        </div>
        <div class="legend_c" @click="showLayer(2)">
          <img src="~./icon/风电_已建.png" alt>风电
        </div>
        <div class="legend_c" @click="showLayer(3)">
          <img src="~./icon/光伏_已建.png" alt>光伏
        </div>
        <div class="legend_c" @click="showLayer(4)">
          <img src="~./icon/核电_已建.png" alt>核电
        </div>
        <div class="legend_h" @click="showLayer(7)" v-show="closebtn">
          <img src="~./icon/close.png" alt>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import echarts from "echarts";
// 引入地图
import "echarts/lib/chart/map";
// 引入js
import "echarts/map/js/china.js";
import lsfd from './json/风电_已建_FeaturesToJSON.json'
import gf from './json/光伏_已建_FeaturesToJSON.json'
import hsfd from './json/海上风电_FeaturesToJSON.json'
import hd from './json/核电_已建_FeaturesToJSON.json'
import sd from './json/常规水电_已建_FeaturesToJSON.json'
import cx from './json/抽蓄_all_FeaturesToJSON.json'
export default {
  data () {
    return {
      chart: null,
      map: null,
      option: [],
      sdData: [],
      fdData: [],
      gfData: [],
      cxData: [],
      hdData: [],
      typeData: [
        {
          name: '常规水电',
          value: '3.57',
          unit: '亿KW'
        },
        {
          name: '抽蓄',
          value: '0.40',
          unit: '亿KW'
        },
        {
          name: '风电',
          value: '3.39',
          unit: '亿KW'
        },
        {
          name: '光伏',
          value: '3.28',
          unit: '亿KW'
        },
        {
          name: '核电',
          value: '0.54',
          unit: '亿KW'
        },
        {
          name: '气电',
          value: '1.09',
          unit: '亿KW'
        },
        {
          name: '煤电',
          value: '11.08',
          unit: '亿KW'
        }
      ],
      colorData: [
        require("./icon/水电_已建.png"),
        require("./icon/抽蓄_已建.png"),
        require("./icon/风电_已建.png"),
        require("./icon/光伏_已建.png"),
        require("./icon/核电_已建.png")
      ],
      clickType: 7,//7代表全部   0-6代表电源类型下标
      closebtn: false,//是否展示全部
    }
  },
  mounted () {
    this.initMap();
  },
  methods: {
    initMap () {
      this.chart = echarts.init(document.getElementById("viewDiv_dyfzqk"));
      // 处理电源点数据
      const convertData = function (data, type) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          let item = data[i]
          res.push({
            name: item.properties['名称'] || item.properties['项目名称'] || item.properties['电厂名称'] || item.properties.name,
            value: item.geometry.coordinates,
            properties: item.properties,
            type: type
          })
        }
        return res;
      };
      this.sdData = convertData(sd.features, '常规水电')
      this.cxData = convertData(cx.features, '抽蓄')
      this.fdData = convertData(lsfd.features, '风电').concat(convertData(hsfd.features, '风电'))
      this.gfData = convertData(gf.features, '光伏')
      this.hdData = convertData(hd.features, '核电')
      this.option = {
        visualMap: {
          min: 0,
          show: false,
          text: ["", ""],
          textStyle: {
            color: "#808DA0",
            fontSize: 32,
          },
          calculable: false,
          seriesIndex: [0], //这个对应的是series的数组下标
          inRange: {
            color: ['#1A749C', '#1A6993', '#1A4275'],
          },
          itemWidth: 84, //图形的宽度，即长条的宽度。
          itemHeight: 154, //图形的高度，即长条的高度。
          bottom: 150,
          left: 205,
        },
        geo: {
          show: true,
          zoom: 1,
          map: "china",
          roam: false,
          itemStyle: {
            normal: {
              color: '#d7d7d7',
              borderColor: '#FFF',
              borderWidth: 0.2, //分界线宽度   
              shadowBlur: 0,
              shadowColor: '#d7d7d7',
              shadowOffsetY: 30
            },
            emphasis: {
              color: '#d7d7d7',
            }
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          regions: [{
            name: '南海诸岛',
            itemStyle: {
              areaColor: 'rgba(0, 10, 52, 0)',
              borderColor: 'rgba(0, 10, 52, 0)'
            },
            emphasis: {
              areaColor: 'rgba(0, 10, 52, 0)',
              borderColor: 'rgba(0, 10, 52, 0)'
            }
          }],
        },
        legend: {
          show: false,
          bottom: 140,
          left: 40,
          orient: "vertical",
          itemWidth: 50,
          itemHeight: 50,
          textStyle: {
            fontSize: 25,
            padding: [0, 15]
          }
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          backgroundColor: "rgba(49, 39, 168, 0.73)",
          extraCssText: "background:#00083C;border-radius: 16px 16px 16px 16px;opacity: 0.7;",
          padding: [20, 0],
          textStyle: {
            color: "#FFFFFF",
            fontWeight: 400,
            fontFamily: "Source Han Sans CN",
            fontSize: 36,
            lineHeight: 80,
          },
          position: function (point, params, dom, rect, size) {
            dom.style.transform = 'translateZ(0)'
          },
          formatter: (params) => {
            if (params.seriesType == "scatter" && (params.data.type == '常规水电' || params.data.type == '抽蓄' || params.data.type == '风电')) {
              return `
                <span style='display:block; background:${params.data.type == '常规水电' ? '#081CF2' : params.data.type == '抽蓄' ? '#08E5F7' : params.data.type == '风电' ? '#08F521' : ''
                }; border-radius:50%; width:0.7em; left:20px;top:35px;height:0.7em; position:absolute;'></span>
                <div style='width:600px;margin-left:50px'>
                  <span style='color:#fff;width:600px;border:1px;max-width: 600px;white-space:pre-wrap;'>${params.data.name || ""
                }</span><br/>
                  <span style='color:#fff'>类型：${params.data.type || ""
                }</span><br/>
                  <span style='color:#fff'>装机容量：${params.data.properties['已建装机容量_万千瓦'] || ''}万千瓦
                </span><br/>
                  <span style='color:#fff'>地址: ${params.data.properties['地址'] || ''
                }</span>
                </div>
              `;
            }
            if (params.seriesType == "scatter" && params.data.type == '光伏') {
              return `
                <span style='display:block; background:#F0CB21; border-radius:50%; width:0.7em; left:20px;top:35px;height:0.7em; position:absolute;'></span>
                <div style='width:600px;margin-left:50px'>
                  <span style='color:#fff;width:600px;border:1px;max-width: 600px;white-space:pre-wrap;'>${params.data.name || ""
                }</span><br/>
                  <span style='color:#fff'>类型：${params.data.type || ""
                }</span><br/>
                  <span style='color:#fff'>装机容量：${params.data.properties['装机容量_兆瓦'] || ''}兆瓦
                    </span><br/>
                  <span style='color:#fff'>地址: ${params.data.properties['地址'] || ''
                }</span>
                </div>
              `;
            }
            if (params.seriesType == "scatter" && params.data.type == '核电') {
              return `
                <span style='display:block; background:#F5A70D; border-radius:50%; width:0.7em; left:20px;top:35px;height:0.7em; position:absolute;'></span>
                <div style='width:600px;margin-left:50px'>
                  <span style='color:#fff;width:600px;border:1px;max-width: 600px;white-space:pre-wrap;'>${params.data.name || ""
                }</span><br/>
                  <span style='color:#fff'>类型：${params.data.type || ""
                }</span><br/>
                  <span style='color:#fff'>已建装机容量:${params.data.properties['已建装机容量_万千瓦'] || ''}万千瓦
                    </span><br/>
                  <span style='color:#fff'>地址: ${params.data.properties['地址'] || ''
                }</span>
                </div>
              `;
            }
          },
        },
        series: []
      };
      this.mapFilter()
    },
    showLayer (index) {
      this.clickType = index
      if (index != 7) {
        this.closebtn = true
      } else {
        this.closebtn = false
      }
      this.mapFilter()
    },
    mapFilter () {
      var data = [
        { name: "北京", value: 44 },
        { name: "天津", value: 42 },
        { name: "河北", value: 43 },
        { name: "山西", value: 44 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 65 },
        { name: "吉林", value: 66 },
        { name: "黑龙江", value: 67 },
        { name: "上海", value: 34 },
        { name: "江苏", value: 36 },
        { name: "浙江", value: 37 },
        { name: "安徽", value: 38 },
        { name: "福建", value: 39 },
        { name: "江西", value: 40 },
        { name: "山东", value: 41 },
        { name: "河南", value: 42 },
        { name: "湖北", value: 43 },
        { name: "湖南", value: 44 },
        { name: "重庆", value: 45 },
        { name: "四川", value: 46 },
        { name: "贵州", value: 47 },
        { name: "云南", value: 68 },
        { name: "西藏", value: 69 },
        { name: "陕西", value: 48 },
        { name: "甘肃", value: 49 },
        { name: "青海", value: 45 },
        { name: "宁夏", value: 46 },
        { name: "新疆", value: 70 },
        { name: "广东", value: 71 },
        { name: "广西", value: 72 },
        { name: "海南", value: 45 },
      ];
      var mapS = [
        {
          type: 'map',
          map: 'china',
          roam: false,
          zoom: 1,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          zlevel: 1,
          data: data,
          itemStyle: {
            normal: {
              color: '#031525',
              borderColor: '#fff',
              opacity: 0.8,
              borderWidth: 0.2, //分界线宽度
            },
            emphasis: {
              color: '#2B91B7',
            }
          }
        }
      ]
      var series = [
        {
          name: '常规水电',
          type: 'scatter',
          coordinateSystem: "geo",
          symbol: 'image://' + this.colorData[0],
          symbolSize: 10,
          zlevel: 2,
          data: this.sdData
        },
        {
          name: '抽蓄',
          type: 'scatter',
          coordinateSystem: "geo",
          symbol: 'image://' + this.colorData[1],
          symbolSize: 10,
          zlevel: 2,
          data: this.cxData
        },
        {
          name: '风电',
          type: 'scatter',
          coordinateSystem: "geo",
          symbol: 'image://' + this.colorData[2],
          symbolSize: 10,
          zlevel: 2,
          data: this.fdData
        },
        {
          name: '光伏',
          type: 'scatter',
          coordinateSystem: "geo",
          symbol: 'image://' + this.colorData[3],
          symbolSize: 10,
          zlevel: 2,
          data: this.gfData
        },
        {
          name: '核电',
          type: 'scatter',
          coordinateSystem: "geo",
          symbol: 'image://' + this.colorData[4],
          symbolSize: 10,
          zlevel: 2,
          data: this.hdData
        }
      ]
      if (this.clickType == 7) {
        series.forEach(item => {
          item.symbolSize = 10
        })
        this.option = {
          ...this.option,
          series: mapS.concat(series)
        }
      } else {
        series.forEach(item => {
          if (item.name == '风电' || item.name == '光伏') {
            item.symbolSize = 12
          } else {
            item.symbolSize = 15
          }
        })
        this.option = {
          ...this.option,
          series: mapS.concat([series[this.clickType]])
        }
      }
      this.chart.setOption(this.option, true);
      this.chart.on('click', (params) => {
        console.log("点击", params)
        if (params.seriesType == "map" && !['香港', '台湾', '澳门', '南海诸岛'].includes(params.name)) {
          this.$emit('changeCity', params.name)
        }
      })
      //移动到地图无强显效果
      this.chart.on('mouseover', () => {
        this.chart.dispatchAction({
          type: 'downplay'
        })
      })
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    },
    doubleclick () {
      this.$emit('changeCity', '全国')
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      })
    },
  }
}
</script>

<style  lang="scss">
.power_info_fhs {
  display: block;
  position: relative;
  width: 1200px;
  height: 500px;

  .cenBox {
    // display: flex;
    // justify-content: center;
    // flex-wrap: wrap;
    // align-items: center;
    // position: absolute;
    // top: 140px;
    // left: -112px;
    // width: 2266px;
    // pointer-events: none;

    .pass {
      cursor: pointer;
      margin: 20px;
      width: 390px;
      height: 200px;
      background: rgba(213, 220, 228, 0.2);
      border-radius: 24px 24px 24px 24px;
      border: 1px solid rgba(213, 220, 228, 1);
      text-align: center;
      z-index: 24;

      :first-child {
        font-size: 50px;
        margin-top: 20px;
      }

      :nth-child(2) {
        font-size: 42px;
        margin-top: 20px;

        span {
          font-size: 24px;
          color: #808da0;
        }
      }
    }
  }

  #legend_dym2 {
    position: absolute;
    width: 300px;
    height: 340px;
    // bottom: 70px;
    left: 40px;
    border: 2px dashed #000;
  }

  #legend_titlem2 {
    position: relative;
    width: 300px;
    height: 70px;
    background-color: #006688;
    font-size: 40px;
    line-height: 70px;
    text-align: center;
    color: aliceblue;
  }

  #legend_dym2 #legend_titlem2 .legend_c {
    color: #000;
    font-size: 25px;
    height: 50px;
    text-align: left;
    margin-left: 40px;
    cursor: pointer;
  }

  .legend_c img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 40px;
  }

  .legend_h {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 40px;
    height: 40px;
  }

  .legend_h img {
    width: 30px;
    height: 30px;
  }
}
</style>