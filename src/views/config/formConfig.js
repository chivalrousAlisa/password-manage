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
    password: 'Text',
    email: 'Text',
    phone: 'Text',
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
  }
};
