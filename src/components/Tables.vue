/*
props:
  columns:[{title:'表格列名',dataKey:'数据来源对应字段',hasSlot:true如果设置true，调用组件时需配置对应名的slot模板, render(rowData,data,index)}]
  dataSource:[]
  actionGroup:[]
事件：
  <!-- opearateBack(rowData,operateKey) -->
*/
<template lang="html">
  <div class="">
    <table>
      <thead>
        <tr>
          <th v-for="item in columns">{{item.title}}</th>
          <th v-if="actionGroup">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item0, index0) in dataSource">
          <td v-for="item1 in columns">
            <slot v-if="item1.hasSlot" :name="item1.dataKey"></slot>
            <div v-else-if="item1.render && typeof item1.render === 'function'" v-html="item1.render(item0, dataSource, index0)">
            </div>
            <span v-else>{{item0[item1.dataKey]}}</span>
          </td>
          <td v-if="actionGroup">
            <span v-for="action in actionGroup"><a href="javascript:;" @click="$emit('opearateBack',item0,action.key)">{{action.value}}</a>&nbsp;&nbsp;</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  const Tables = {
    props:{
      dataSource:{
        type: Array
      },
      columns:{
        required:true
      },
      actionGroup:{
        type: Array
      }
    },
    data() {
      return{
      }
    },
    mounted(){
      // console.log(this.config);
    },
    computed:{
    },
    methods:{

    }
  }
  export default Tables
</script>
