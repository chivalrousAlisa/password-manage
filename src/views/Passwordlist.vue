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
        <li class="search-item lf">
          <label for="">手机号</label>
          <select type="text" v-model="searchData.phone">
            <option value=""></option>
            <option v-for="item in phoneList" :value="item">{{item}}</option>
          </select>
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
          v-on:opearateBack="onOpearate"
        >
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
    <!-- 删除确认框 -->
    <modal
      v-bind:isShow="showConfirmModal"
      type="confirm"
      v-on:okBack="onConfirmModal"
      v-on:cancelBack="showConfirmModal=false"
      title="操作提示"
      content="您确认要删除吗？"
    >
    </modal>
    <!-- 显示密码弹框 -->
    <modal
      v-bind:isShow="showViewModal"
      type="dialog"
      v-on:closeBack="showViewModal = false"
      v-on:okBack="onViewModalOk"
      v-on:cancelBack="showViewModal = false"
      title="查看密码"
      width="400"
    >
      <div slot="content">
        <h3 style="margin-bottom:15px;">查看密码需要服务密码：</h3>
        <input type="password" v-model="servicePwd"/>
      </div>
    </modal>
  </div>
</template>
<style>
  .search-fields{
    padding-bottom:25px;
    border-bottom:1px solid #ddd;
  }
  .search-item input, .search-item select{
    width:73%;
  }
  .search-item label{
    display:inline-block;
    width:60px;
    text-align: right;
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
    padding:10px 0;
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
  import { pwdRenderFn, phoneList, appHost } from './config/utils';
  export default {
    data(){
      return {
        formConfig,
        tableConfig,
        tableData:[],
        currentRowData:{},
        pwdRenderFn,
        phoneList,
        appHost,

        searchData:{},

        showModal:false,
        modalType:'',
        modalTitle:'',
        modalContent:'',

        formData:{},
        servicePwd:'',

        showMessageModal:false, // 公共
        showViewModal:false,

        showConfirmModal:false, // 删除确认框

      }
    },
    mounted(){
      this.loadData();
    },
    methods:{
      onSearch(){
        this.loadData();
      },
      onClear(){
        this.searchData = {};
      },
      onModifyAccount(type,rowData={}){
        // this.$toast('woashi');
        // return;
        if(type === 'add'){
          this.formData = {};
          this.modalTitle = '新增账户'
        }else if(type === 'edit'){
          this.formData = rowData;
          this.modalTitle = '编辑账户';
        }
        this.showModal = true;
      },
      onOpearate(rowData,operateKey){
        this.currentRowData = rowData;
        if(operateKey === 'togglPwd'){
          const currentIsHide = rowData.isHidePwd;
          if (currentIsHide) {
            this.servicePwd = '';
            this.showViewModal = true;
          } else {
            this.currentRowData.isHidePwd = !this.currentRowData.isHidePwd;
          }
        } else if (operateKey === 'edit') {
          this.onModifyAccount('edit', rowData);
        } else if (operateKey === 'del') {
          this.showConfirmModal = true;
        }
      },
      onViewModalOk(){
        this._checkAuthority();
      },
      onConfirmModal(){
        this.showConfirmModal = false;
        this._onDeleteAccount();
      },
      // 显示密码，先验证，验证通过后容许查看
      _checkAuthority(){
        const self = this;
        axios.post(this.appHost + "/accounts/checkAuthority",{servicePwd: this.servicePwd}).then((res) => {
          const result = res.data;
          self.showViewModal = false;
          if(!result.hasError && result.content && result.content.isSuccess){
            self.currentRowData.isHidePwd = !self.currentRowData.isHidePwd;
          } else {
            self.showMessageModal = true;
            self.modalContent = result.message;
          }
        });
      },
      _findIndex(value,arr,byKey){
        // 从数组arr中找对应byKey值为value的index
        for(let i = 0; i < arr.length; i++){
          if(arr[i][byKey] === value){
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
        axios.post(this.appHost + "/accounts/editAccount",{accountData:this.formData}).then((result) => {
          const res = result.data;
          if(res.content && res.content.isSuccess){
            this.modalType = 'success';
            this._closeDialogModal();
            this.loadData();
          }else{
            this.modalType = 'error';
          }
          this.modalContent = res.message;
          this.showMessageModal = true;
        });
      },
      _onDeleteAccount(){
        const self = this;
        axios.post(this.appHost + "/accounts/deleteAccount",{accountId:this.currentRowData._id}).then((result) => {
          const res = result.data;
          if(res.content && res.content.isSuccess){
            this.modalType = 'success';
            this.loadData();
          }else{
            this.modalType = 'error';
          }
          this.modalContent = res.message;
          this.showMessageModal = true;
        });
      },
      onModalCancel(){
        this._closeDialogModal();
      },
      onFormChange(value, attrName){
        this.formData[attrName] = value
      },
      loadData(){
        axios.get(this.appHost + "/accounts/list",{params:{searchData:this.searchData}}).then((res) => {
          if(res.data.hasError){
            return;
          }
          const content = res.data.content;
          if(content.retValue){
            content.retValue.forEach((item) => {
              item.isHidePwd = true;
            });
            this.tableData = content.retValue;
          }
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
