export default [
  {
    title:"账户平台",
    dataKey:"platform",
    render:function(rowData, data, index){
      return '<span>'+rowData.platform+'</span>';
    }
  },
  {
    title:"账户",
    dataKey:"account"
  },
  {
    title:"密码",
    dataKey:"password",
    hasSlot:true
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
    dataKey:"description"
  }
];
