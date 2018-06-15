<template lang="html">
  <div class="">
    <div class="search-fields">
      <ul class="search-form pw-clear">
        <li class="search-item lf">
          <label for="">账户</label>
          <input type="text" v-model="searchData.account"/>
        </li>
        <li class="search-item lf">
          <label for="">平台</label>
          <input type="text" v-model="searchData.platform"/>
        </li>
      </ul>
      <div class="search-bar">
        <button type="button" class="btn btn-primary" @click="onSearch">查询</button>&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn" @click="onClear">清空</button>
      </div>
    </div>
    <div class="list-fields">
      <div class="action-wrap">
        <button type="button" class="btn btn-primary" @click="onModifyAccount('add')">新增账户</button>
      </div>
      <div class="table-wrap">
        <tables
          :columns="tableConfig"
          :dataSource="tableData"
          :actionGroup="actionGroup"
          v-on:opearateBack="onOpearate"
        >
          <span slot="password">******</span>
        </tables>
      </div>
    </div>
    <!-- 新增和修改弹框共用一个modal -->
    <modal
      v-bind:isShow="showModal"
      type="dialog"
      v-on:closeBack="onModalClose"
      v-on:okBack="onAddModalOk"
      v-on:cancelBack="onModalCancel"
      :title="modalTitle"
    >
      <div slot="content" style="margin-left:-32px;">
        <forms
          v-bind:data="formData"
          v-bind:config="formConfig"
          v-on:changeBack="onFormChange"
        >
        </forms>
      </div>
    </modal>
    <!-- 所有message弹框提示共用一个modal -->
    <modal
      v-bind:isShow="showMessageModal"
      v-bind:type="modalType"
      v-on:okBack="showMessageModal=false"
      title="操作提示"
      :content="modalContent"
    >
    </modal>
  </div>
</template>
<style>
  .search-fields{
    padding-bottom:25px;
    border-bottom:1px solid #ddd;
  }
  .search-item input{
    width:75%;
  }
  .search-item label{
    padding-right:10px;
  }
  .search-form{
    padding: 0 6%;
  }
  .search-bar{
    padding-top:25px;
  }
  .search-item{
    width:50%;
  }
  .search-bar{
    text-align: center;
  }
  .list-fields{
    margin-top:20px;
  }
  .table-wrap{
    margin-top:20px;
  }
</style>
<script>
  import tables from '../components/Tables';
  import tableConfig from './config/tableConfig';
  import formConfig from './config/formConfig';
  import modal from '../components/Modal';
  import forms from '../components/Forms';
  import axios from 'axios';
  export default {
    data(){
      return {
        formConfig,
        tableConfig,
        tableData:[],
        actionGroup:[{
          key:'edit',
          value:'修改'
        },{
          key:'showPwd',
          value:'显示密码'
        },{
          key:'del',
          value:'删除'
        }],

        searchData:{
          account:'',
          platform:''
        },

        showModal:false,
        modalType:'',
        modalTitle:'',
        modalContent:'',

        formData:{},

        showMessageModal:false
      }
    },
    mounted(){
      this.loadData();
    },
    methods:{
      onSearch(){
        console.log(this.searchData);
      },
      onClear(){
        this.searchData = {};
      },
      onModifyAccount(type,rowData={}){
        if(type === 'add'){
          this.formData = {};
          this.modalTitle = '新增账户'
        }else if(type === 'edit'){
          this.formData = rowData;
          this.formData.password = '';
          this.modalTitle = '编辑账户';
        }
        this.showModal = true;
      },
      onOpearate(rowData,operateKey){
        console.log(rowData,operateKey);
        if(operateKey === 'showPwd'){
          const index = this._findIndex('password');
          this.tableConfig[index].hasSlot = !this.tableConfig[index].hasSlot;
        } else if (operateKey === 'edit') {
          this.onModifyAccount('edit', rowData);
        }
      },
      _findIndex(dataKey){
        for(let i = 0; i < this.tableConfig.length; i++){
          if(this.tableConfig[i].dataKey === dataKey){
            return i;
          }
        }
      },
      _closeDialogModal(){
        this.showModal = false;
      },
      _validator(obj){
        if(this.formConfig.props){
          for (const attrName in this.formConfig.props) {
            if(this.formConfig.props[attrName].required && (!obj[attrName] || obj[attrName] && !obj[attrName].trim())){
              return false;
            }
          }
        }
        return true;
      },
      onModalClose(){
        this._closeDialogModal();
      },
      onAddModalOk(){
        if(!this._validator(this.formData)){
          this.showMessageModal = true;
          this.modalType = 'error';
          this.modalContent = '有必填项未填';
          return;
        }
        this.showMessageModal = false;
      },
      onModalCancel(){
        this._closeDialogModal();
      },
      onFormChange(value, attrName){
        this.formData[attrName] = value
      },
      loadData(){
        axios.get("/accounts/list").then((res) => {
          const content = res.data.content;
          this.tableData = content.retValue;
        });
      }
    },
    components:{
      tables,
      modal,
      forms
    }
  }
</script>
