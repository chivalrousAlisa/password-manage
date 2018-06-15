export default {
  title: '采购线组件',
  fields: ['Text','Select','TEXTAREA'],
  labels: {
    Text: '文本框',
    Select: '下拉框',
    TEXTAREA: '编辑框'
  },
  types: {
    Text: 'Text',
    Select: 'Select',
    TEXTAREA: 'TEXTAREA'
  },
  props: {
    Text: {
      required: true
    },
    TEXTAREA: {
      totalCount: 10
    }
  },
  options: {
    Select: {
      A: '值A',
      B: '值B',
      C: '值C'
    }
  }
};
