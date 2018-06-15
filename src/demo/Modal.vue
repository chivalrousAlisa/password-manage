<template>
  <div>
    <button type="button" class="btn" @click="showModal('dialog')">dialog</button>
    <button type="button" class="btn" @click="showModal('info')">info</button>
    <button type="button" class="btn btn-primary" @click="showModal('confirm')">confirm</button>
    <button type="button" class="btn btn-primary" @click="showModal('success')">Success</button>
    <button type="button" class="btn btn-primary" @click="showModal('error')">error</button>
    <button type="button" class="btn btn-primary" @click="showModal('warning')">warn</button>
    <modal
      v-bind:isShow="isShow"
      v-bind:type="modalType"
      v-on:closeBack="onClose"
      v-on:okBack="onOk"
      v-on:cancelBack="onCancel"
      title="标题"
      content="内容"
    >
      <div slot="content">
        对话框模板内容
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/Modal';
export default {
  data(){
    return {
      isShow:false,
      modalType:''
    }
  },
  methods:{
    closeModal(){
      this.isShow = false;
    },
    showModal(type){
      this.isShow = true;
      this.modalType = type;
    },
    onClose(){
      this.closeModal();
    },
    onOk(){
      this.closeModal();
    },
    onCancel(){
      this.closeModal();
    }
  },
  components:{
    Modal
  }
}
</script>

<style lang="css">
</style>
