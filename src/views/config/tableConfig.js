import { actionConfig, pwdRenderFn } from './utils';
export default [
  {
    title:"账户平台",
    dataKey:"platform",
    render:function(rowData, data, index){
      return '<span>'+rowData.platform+'</span>';
    },
    style:{width:'60px'}
  },
  {
    title:"账户",
    dataKey:"account"
  },
  {
    title:"密码",
    dataKey:"password",
    render:pwdRenderFn,
    style:{width:'100px'}
  },
  {
    title:"邮箱",
    dataKey:"email",
  },
  {
    title:"手机号",
    dataKey:"phone"
  },
  {
    title:"描述",
    dataKey:"description",
    style:{width:'200px'}
  },
  {
    title:"操作",
    dataKey:"action",
    actionGroup:actionConfig,
    style:{width:'150px'}
  }
];
