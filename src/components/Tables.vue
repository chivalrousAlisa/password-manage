/*
props:
  columns:[{
    title:'表格列名',
    dataKey:'数据来源对应字段,值为action特例，为操作项',
    render(rowData,data,index)},
    actionGroup:‘datakey为action时，[{key:'',value:'', render:function(rowData, data, index)}]}’
    style:{}
  }]
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
          <th v-for="item in columns" :style="item.style">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dataSource.length=='0'">
          <td style="text-align:center;" :colspan="columns.length">暂无数据</td>
        </tr>
        <tr v-for="(item0, index0) in dataSource" :key="index0" v-else>
          <td v-for="(item1,index1) in columns" :key="index1">
            <div v-if="item1.render && typeof item1.render === 'function'" v-html="item1.render(item0, dataSource, index0)">
            </div>
            <div v-else-if="item1.dataKey === 'action'">
              <span v-for="action in item1.actionGroup">
                <a href="javascript:;" @click="$emit('opearateBack',item0, action.key)">
                  <span v-if="action.render && typeof action.render === 'function'" v-html="action.render(item0, dataSource, index0)"></span>
                  <span v-else>{{action.value}}</span>
                </a>&nbsp;
              </span>
            </div>
            <span v-else>{{item0[item1.dataKey]}}</span>
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
