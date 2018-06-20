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
