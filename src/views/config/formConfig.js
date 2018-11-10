import { phoneList } from './utils'
const phone = {"":""};
phoneList.forEach((item) => {
  phone[item]=item;
});
export default {
  fields: ['platform','account','password','email','phone','description'],
  labels: {
    platform: '账户平台',
    account: '账户',
    password: '密码',
    email: '邮箱',
    phone: '手机号',
    description: '描述'
  },
  types: {
    platform: 'Text',
    account: 'Text',
    password: 'Password',
    email: 'Select',
    phone: 'Select',
    description: 'TEXTAREA'
  },
  props: {
    platform: {
      required: true
    },
    account: {
      required: true
    },
    password: {
      required: true
    }
  },
  options:{
    email:{'':'','13065589219@163.com':'13065589219@163.com','houjievip1@sina.com':'houjievip1@sina.com'},
    phone
  }
};
