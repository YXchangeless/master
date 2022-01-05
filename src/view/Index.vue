<template>
  <div>
    <a-row>
      <span style="width: 2px;height:6px;background-color: blue;border: 1px solid #000"></span>基本信息
    </a-row>
    <a-row class="row">
      <a-col :span="24">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">项目名称 :</div>
          <a-input placeholder="请输入" />
        </div>
      </a-col>
    </a-row>
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">是否重点 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">是否投资 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">业务板块 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">工程类型 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">细分类型 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">项目状态 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">跟踪等级 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">所在城市 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">所在区域 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">路局 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">我方分管领导 :</div>
          <a-input placeholder="请输入我方分管领导" />
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">具体负责人 :</div>
          <a-input placeholder="请输入具体负责人" />
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">项目属性 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">所属业态 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">所属行业 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">工程类别 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">国家 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">所属省/市/路局 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">申请单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">我方分管领导 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">具体负责人 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">建设单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">建设单位联系人 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">设计单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">设计单位联系人 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">建设单位联系人 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">招标代理单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">招标代理人 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">资质要求（含所有标段） :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">区域经营机构 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name" style="color: red;">预计中标金额 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">资金来源 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">投资（万元） :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <a-row class="row">
      <a-col :span="24">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">资金来源 :</div>
          <a-input placeholder="请输入" />
        </div>
      </a-col>
    </a-row>
    <a-row class="row">
      <a-col :span="24">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">准入条件 :</div>
          <a-input placeholder="请输入" />
        </div>
      </a-col>
    </a-row>
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">信息建立时间 :</div>
          <a-date-picker show-time placeholder="请选择">
            <template slot="renderExtraFooter">
              extra footer
            </template>
          </a-date-picker>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">报名时间 :</div>
          <a-date-picker show-time placeholder="请选择">
            <template slot="renderExtraFooter">
              extra footer
            </template>
          </a-date-picker>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">资审文件提交时间 :</div>
          <a-date-picker show-time placeholder="请选择">
            <template slot="renderExtraFooter">
              extra footer
            </template>
          </a-date-picker>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">开标时间 :</div>
          <a-date-picker show-time placeholder="请选择">
            <template slot="renderExtraFooter">
              extra footer
            </template>
          </a-date-picker>
        </div>
      </a-col>
    </a-row>
    <!--  -->
    <a-row>
      <span style="width: 2px;height:6px;background-color: blue;border: 1px solid #000"></span>标段信息
    </a-row>
    <div style="margin-left:100px">标段列表</div>
    <div>
      <a-button type="primary">新增行</a-button>
      <a-button>删除行</a-button>
    </div>
    <!-- table -->
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection"
      :expanded-row-keys.sync="expandedRowKeys" style="margin-top:20px" />
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">标段名称 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">是否细分标段 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">是否纳入数量总计 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">投标情况 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">招标方式 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">投标方式 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="8">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">区域协助/内部包发单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">是否高精尖 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="display: flex;">
          <div class="name">是否军民融合 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="12">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">标段情况 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="display: flex;">
          <div class="name">评标办法 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">标段名称 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">标段估价 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">暂定金 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">预计开标时间 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">测算成本（万元） :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">投标价格（万元） :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">专家评委 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name" style="color: red;">预计中标金额 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">中标价格（万元） :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">中标时间 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">中标单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">项目利润 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">拟任项目经理 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">拟任总工 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="display: flex;">
          <div class="name">开竣工日期 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="12">
        <div style="display: flex;">
          <div class="name">放弃/失资格原因 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="display: flex;">
          <div class="name">中标/失标原因 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
    <!-- 1 -->
    <a-row class="row">
      <a-col :span="6">
        <div style="display: flex;padding: 0 10px;">
          <div class="name">资质单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div style="display: flex;">
          <div class="name">选我方参与投标单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="display: flex;">
          <div class="name">申请单位 :</div>
          <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <!-- 2 -->
        <!-- 1 -->
        <a-row class="row">
          <a-col :span="8">
            <div style="display: flex;">
              <div class="name">跟踪等级 :</div>
              <a-select label-in-value :default-value="{ key: 'lucy' }" style="width: 100%" @change="handleChange">
                <a-select-option value="jack">
                  Jack (100)
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy (101)
                </a-select-option>
              </a-select>
            </div>
          </a-col>
        </a-row>
        <!-- 2 -->
  </div>
</template>
<script>
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  export default {
    data() {
      return {
        data,
        columns,
        rowSelection,
        expandedRowKeys: [],
      };
    },
  };
</script>
<style lang="scss" scoped>
  .row {
    margin-bottom: 10px;
  }

  .name {
    width: 150px;
  }
</style>