<template>
  <div>
    <div style="margin:20px;">
      <tables
        :columns="tableConfig"
        :dataSource="tableData"
        :actionGroup="actionGroup"
        v-on:opearateBack="onOpearate"
      >
      </tables>
    </div>
  </div>
</template>

<script>
import Tables from '../components/Tables';
import tableConfig from './tableConfig';
import tableData from './tableData';
export default {
  data(){
    return {
      tableConfig,
      tableData,
      actionGroup:[{
        key:'edit',
        value:'修改'
      },{
        key:'del',
        value:'删除'
      }]
    }
  },
  methods:{
    onOpearate(rowData,operateKey){
      console.log(rowData,operateKey);
    }
  },
  components:{
    Tables
  }
}
</script>

<style lang="css">
</style>
