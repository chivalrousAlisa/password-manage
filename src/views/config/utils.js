export const pwdRenderFn = function(rowData, data, index){
  if(!rowData.isHidePwd){
    return rowData.password;
  }
  return '<span>******</span>';
};
export const actionConfig = [{
  key:'edit',
  value:'修改'
},{
  key:'togglPwd',
  render:function(rowData, data, index){
    if(rowData.isHidePwd){
      return '显示密码'
    }
    return '隐藏密码';
  }
},{
  key:'del',
  value:'删除'
}];
export const phoneList = [
  "13065589219",
  "17051339218",
  "17630982468",
  "15294711250",
  "15937626736",
  "18668049618"
];
export const appHost = "//localhost:4200";
