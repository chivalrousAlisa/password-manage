<template>
  <div>
    <forms
      v-bind:data="formData"
      v-bind:config="formConfig"
      v-on:changeBack="onChange"
    >
    </forms>
    <button type="button" name="button" @click="getFormData">huoqu</button>
  </div>
</template>

<script>
import Forms from '../components/Form';
import formConfig from './formConfig'
export default {
  data(){
    return {
      formConfig,
      formData:{Text:'dfadf',Select:'B',TEXTAREA:'333'}
    }
  },
  methods:{
    getFormData(){
      console.log(this.formData.Select);
    },
    onChange(value, attrName){
      this.formData[attrName] = value
    }
  },
  components:{
    Forms
  }
}
</script>

<style lang="css">
</style>
