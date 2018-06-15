/*
props:
  data
  config
事件：
  changeBack(data,attrName)
*/
<template lang="html">
  <div>
    <form>
      <div class="form-item" v-for="item in config.fields">
        <div class="item-label">
          <span v-if="config['props'][item] && config['props'][item]['required']" class="required">*</span>{{config['labels'][item]}}
        </div>
        <div class="item-content">
          <input type="text" v-if="config['types'][item]==='Text'" v-bind:value="data[item]" v-on:input="$emit('changeBack', $event.target.value, item)">
          <select v-else-if="config['types'][item]==='Select'" v-bind:value="data[item]" v-on:change="$emit('changeBack', $event.target.value, item)">
            <option v-bind:value="key" v-for="(value, key) in config['options'][item]">{{value}}</option>
          </select>
          <textarea v-else-if="config['types'][item]==='TEXTAREA'" rows="5" v-on:input="$emit('changeBack', $event.target.value, item)">{{data[item]}}</textarea>
          <input type="text" v-else>
        </div>
      </div>
    </form>
  </div>
</template>
<style>
  .form-item{
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 18px;
    vertical-align: top;
    box-sizing: border-box;
  }
  .item-label{
    position:absolute;
    width:100px;
    text-align: right;
  }
  .item-content{
    padding-left:110px;
  }
</style>
<script>
  const Forms = {
    // model:{
    //   prop: 'data',
    //   event: 'change'
    // },
    props:{
      data:{
        type: Object
      },
      config:{
        required:true
      }
    },
    data() {
      return{
      }
    },
    mounted(){
      // console.log(this.config);
    },
    computed:{
    },
    methods:{

    }
  }
  export default Forms
</script>
