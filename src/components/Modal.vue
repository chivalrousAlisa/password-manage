/*
props:
  isShow,是否弹框
  type：modal类型（dialog，默认，info，success，error，warning，confirm）；
  width:dialog 宽度
  slot: content,dialog的内容
事件：
  closeBack:点击x的回调
  okBack,点击确定的回调
  cancelBack，点击取消的回调
*/
<template lang="html">
  <div>
    <div class="modal-mask" v-if="isShow"></div>
    <div class="modal-wrap" v-show="isShow">
      <div class="modal" style="transform-origin:17px -53px 0px;" v-bind:style="{width:modalWidth+'px'}">
        <div class="modal-content">
          <button aria-label="Close" class="modal-close" v-if="type==='dialog'">
            <span class="modal-close-x" @click="onClose">X</span>
          </button>
          <div class="modal-header" v-if="type==='dialog'">
            <div class="modal-title">
              <span style="font-weight:normal;">{{title}}</span>
            </div>
          </div>
          <div class="modal-body">
            <div class="confirm-body-wrapper" v-if="type!=='dialog'">
              <div class="confirm-body">
                <i class="modal-icon" :style="{backgroundPosition:position}"></i>
                <span class="confirm-title">{{title}}</span>
                <div class="confirm-content">{{content}}</div>
              </div>
              <div class="confirm-btns">
                <p v-if="type==='confirm'">
                  <button type="button" class="btn" @click="onCancel">
                    <span>取 消</span>
                  </button>
                  <button type="button" class="btn btn-primary" @click="onOk">
                    <span>确 定</span>
                  </button>
                </p>
                <button type="button" class="btn btn-primary" @click="onOk" v-else>
                  <span>知道了</span>
                </button>
              </div>
            </div>
            <div v-else>
              <slot name="content"></slot>
            </div>
          </div>
          <div class="modal-footer" v-if="type==='dialog'">
            <div>
              <button type="button" class="btn" @click="onCancel">
                <span>取 消</span>
              </button>
              <button type="button" class="btn btn-primary" @click="onOk">
                <span>确 定</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .modal-mask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.65);
    height: 100%;
    z-index: 1000;
  }
  .modal-wrap{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .modal{
    font-family: Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    width: auto;
    margin: 0 auto;
    top: 100px;
    padding-bottom: 24px;
  }
  .modal-content{
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 4px;
    background-clip: padding-box;
    -webkit-box-shadow: 0 4px 12px rgba(0,0,0,.15);
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
  }
  .modal-close{
    cursor: pointer;
    border: 0;
    background: transparent;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    -webkit-transition: color .3s;
    transition: color .3s;
    color: rgba(0,0,0,.45);
    outline: 0;
    padding: 0;
  }
  .modal-close-x{
    display: block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    width: 56px;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
  }
  .modal-header{
    padding: 16px 24px;
    border-radius: 4px 4px 0 0;
    background: #fff;
    color: rgba(0,0,0,.65);
    border-bottom: 1px solid #e8e8e8;
  }
  .modal-title{
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: rgba(0,0,0,.85);
  }
  .modal-body{
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .modal-footer{
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    border-radius: 0 0 4px 4px;
  }
  .modal-footer button+button {
    margin-left: 8px;
    margin-bottom: 0;
  }
  .confirm-body-wrapper{
    zoom: 1;
    overflow:hidden;
  }
  .confirm-body-wrapper:after, .confirm-body-wrapper:before {
    content: "";
    display: table;
  }
  .confirm-body .confirm-title {
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    display: block;
    overflow: auto;
  }
  .confirm-body .confirm-content {
    margin-left: 38px;
    font-size: 14px;
    color: rgba(0,0,0,.65);
    margin-top: 8px;
  }
  .confirm-btns {
    margin-top: 24px;
    float: right;
  }
  .modal-icon{
    float:left;
    margin-right:16px;
    width:24px;
    height:24px;
    vertical-align: middle;
    background-image: url('../assets/messageBackground.png');
  }
</style>
<script>
  const Modal = {
    props:{
      isShow:{
        required:true
      },
      type:{
        default:'dialog'
      },
      width:{
        default: ''
      },
      title:{
        default:'title'
      },
      content:{
        default:'content'
      }
    },
    data() {
      return{
      }
    },
    mounted(){
    },
    computed:{
      position:{
        get(){
          let position;
          switch (this.type) {
            case "info":position = '0 0';break;
            case "success":position = '-24px 0';break;
            case "warning":position='-48px 0';break;
            case "error":position = '-72px 0';break;
            case "confirm":position = '0 0';break;
            default:position = '0 0';
          }
          return position;
        }
      },
      modalWidth:{
        get(){
          if(this.width){
            return this.width;
          }
          return this.type === 'dialog' ? 520 : 416
        }
      }
    },
    methods:{
      onClose(){
        this.$emit("closeBack");
      },
      onCancel(){
        this.$emit("cancelBack");
      },
      onOk(){
        this.$emit("okBack");
      }
    }
  }
  export default Modal
</script>
